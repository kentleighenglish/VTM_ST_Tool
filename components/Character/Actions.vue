<template>
	<div class="characterActions">
		<div v-for="(actionSection, key) in actions" :key="key" class="characterActions__column">
			<div class="characterActions__columnLabel">
				{{ key | humanize }}
			</div>
			<div class="characterActions__actions">
				<div v-for="(action, actionKey) in actionSection" :key="actionKey" class="characterActions__action">
					<CommonButton :state="action.type === 'custom' ? 'special' : 'primary'" gradient @click="onActionClick(actionKey, action)">
						{{ actionKey | humanize }}
					</CommonButton>
				</div>
			</div>
		</div>
		<CharacterActionsOutput :output="output" />
		<CommonModal
			name="customRollModal"
			confirm-label="Roll"
			:confirm="onCustomRoll"
			:confirm-disabled="!customRoll.stat1 || !customRoll.stat2"
		>
			<FormInput v-model="customRoll.stat1" type="select" :options="statsOptions" />
			<FormInput v-model="customRoll.stat2" type="select" :options="statsOptions" />
		</CommonModal>
	</div>
</template>
<script>
import { mapActions } from "vuex";
import { get } from "lodash";
import { decodeHealthValue } from "@/utils/parsers";
import { healthLevels } from "@/data/status";
import * as disciplines from "@/data/advantages/disciplines";
import humanize from "@/filters/humanize";
import actions from "@/data/actions";

export default {
	name: "CharacterActions",
	filters: {
		humanize
	},
	props: {
		characterId: String,
		data: {
			type: Object,
			default: () => ({})
		}
	},
	data () {
		return {
			actions,
			output: [],
			customRoll: {
				stat1: null,
				stat2: null
			}
		}
	},
	computed: {
		characterName () {
			return get(this.data, "details.info.name", null);
		},
		stats () {
			return {
				strength: get(this.data, "attributes.physical.strength", 0),
				dexterity: get(this.data, "attributes.physical.dexterity", 0),
				stamina: get(this.data, "attributes.physical.stamina", 0),
				charisma: get(this.data, "attributes.social.charisma", 0),
				manipulation: get(this.data, "attributes.social.manipulation", 0),
				appearance: get(this.data, "attributes.social.appearance", 0),
				perception: get(this.data, "attributes.mental.perception", 0),
				intelligence: get(this.data, "attributes.mental.intelligence", 0),
				wits: get(this.data, "attributes.mental.wits", 0),
				alertness: get(this.data, "abilities.talents.alertness", 0),
				athletics: get(this.data, "abilities.talents.athletics", 0),
				awareness: get(this.data, "abilities.talents.awareness", 0),
				brawl: get(this.data, "abilities.talents.brawl", 0),
				empathy: get(this.data, "abilities.talents.empathy", 0),
				expression: get(this.data, "abilities.talents.expression", 0),
				intimidation: get(this.data, "abilities.talents.intimidation", 0),
				leadership: get(this.data, "abilities.talents.leadership", 0),
				streetwise: get(this.data, "abilities.talents.streetwise", 0),
				subterfuge: get(this.data, "abilities.talents.subterfuge", 0),
				animalKen: get(this.data, "abilities.skills.animalKen", 0),
				crafts: get(this.data, "abilities.skills.crafts", 0),
				drive: get(this.data, "abilities.skills.drive", 0),
				etiquette: get(this.data, "abilities.skills.etiquette", 0),
				firearms: get(this.data, "abilities.skills.firearms", 0),
				larceny: get(this.data, "abilities.skills.larceny", 0),
				melee: get(this.data, "abilities.skills.melee", 0),
				performance: get(this.data, "abilities.skills.performance", 0),
				stealth: get(this.data, "abilities.skills.stealth", 0),
				survival: get(this.data, "abilities.skills.survival", 0),
				academics: get(this.data, "abilities.knowledges.academics", 0),
				computer: get(this.data, "abilities.knowledges.computer", 0),
				finance: get(this.data, "abilities.knowledges.finance", 0),
				investigation: get(this.data, "abilities.knowledges.investigation", 0),
				law: get(this.data, "abilities.knowledges.law", 0),
				medicine: get(this.data, "abilities.knowledges.medicine", 0),
				occult: get(this.data, "abilities.knowledges.occult", 0),
				politics: get(this.data, "abilities.knowledges.politics", 0),
				science: get(this.data, "abilities.knowledges.science", 0),
				technology: get(this.data, "abilities.knowledges.technology", 0),
				humanity: get(this.data, "status.condition.humanityPath", 0),
				willpower: get(this.data, "status.condition.willpowerStatus", 0),
				conscience: get(this.data, "advantages.virtues.conscienceConviction", 0),
				courage: get(this.data, "advantages.virtues.courage", 0),
				selfControl: get(this.data, "advantages.virtues.selfControl", 0),
				...Object.keys(disciplines).reduce((acc, key) => ({
					...acc,
					[key]: get(this.data, `advantages.disciplines.list.${key}`, 0)
				}), {})
			}
		},
		statsOptions () {
			return Object.keys(this.stats).reduce((acc, key) => ({
				...acc,
				[key]: humanize(key)
			}), {});
		}
	},
	methods: {
		...mapActions({
			openModal: "openModal",
			saveAction: "characters/saveAction"
		}),
		getHealthMod () {
			const healthArray = decodeHealthValue(get(this.data, "status.other.health", null));

			const healthStatus = (healthLevels[healthArray.length - 1] || {});

			return healthStatus.dicePoolMod || 0;
		},
		getSuccesses (diceResult, difficulty = 6) {
			const successes = diceResult.reduce((acc, roll) => {
				if (roll === 10) {
					acc += 2;
				} else if (roll === 1) {
					acc--;
				} else if (roll >= difficulty) {
					acc++;
				}

				return acc;
			}, 0);

			const crit = successes > 5;
			const botch = successes < 0;

			return {
				count: successes,
				status: (!crit && !botch) ? null : (crit ? "crit" : "botch"),
				output: successes < 0 ? "Botch" : `${successes} Success${successes === 1 ? "" : "es"}`
			};
		},
		async onActionClick (name, action) {
			const rollPayload = {
				stats: this.stats,
				mods: {},
				parent: this
			};

			if (action.onTrigger) {
				await action.onTrigger(rollPayload);
				this.customRoll = {
					stat1: null,
					stat2: null
				};
				return;
			}

			const result = action.getOutput(rollPayload);
			const type = action.type;

			let success = {};
			if (type === "diceRoll") {
				success = this.getSuccesses(result);
			}
			const characterName = this.characterName;
			const characterId = this.characterId;

			const actionPayload = {
				characterName,
				characterId,
				name,
				type,
				result,
				successCount: success.count,
				successStatus: success.status,
				successOutput: success.output,
				timestamp: new Date()
			};

			await this.saveAction({ action: actionPayload });
			this.output.unshift(actionPayload);
		},
		onCustomRoll () {

		}
	}
}
</script>
<style lang="scss">
.characterActions {
	display: flex;
	height: 100%;
	padding: $gap * 2 $gap;

	&__column {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	&__columnLabel {
		font-size: 1.2em;
		font-weight: 700;
	}

	&__actions {
		display: flex;
		flex-wrap: wrap;
	}

	&__action {
		display: inline-block;
	}
}
</style>
