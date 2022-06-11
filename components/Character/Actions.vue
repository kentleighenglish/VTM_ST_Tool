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
			name="diceRollModal"
			confirm-label="Roll"
			:confirm="onRoll"
			:close="onRollCancel"
			:confirm-disabled="!rollConfig.stat1 || !rollConfig.stat2 || !rollConfig.difficulty"
		>
			<div class="st-flex">
				<div class="st-flex st-padding-h">
					<FormInput v-model="rollConfig.stat1" label="Stat 1" type="select" :options="statsOptions" disable-reset />
				</div>
				<div class="st-flex st-padding-h">
					<FormInput v-model="rollConfig.stat2" label="Stat 2" type="select" :options="statsOptions" disable-reset />
				</div>
			</div>
			<div class="st-padding">
				<FormInput
					v-model="rollConfig.difficulty"
					label="Difficulty"
					type="number"
					:max="9"
					:min="1"
					disable-reset
				/>
			</div>
			<div class="st-padding">
				<FormInput
					v-model="rollConfig.mods"
					label="Modifiers"
					type="select"
					multiple
					disable-reset
					:options="modsOptions"
				/>
			</div>
		</CommonModal>
	</div>
</template>
<script>
import { mapActions } from "vuex";
import { get } from "lodash";
import { decodeHealthValue } from "@/utils/parsers";
import { healthLevels } from "@/data/status";
import * as disciplines from "@/data/advantages/disciplines";
import * as merits from "@/data/status/merits";
import * as flaws from "@/data/status/flaws";
import humanize from "@/filters/humanize";
import actions from "@/data/actions";
import { rollDice } from "@/data/actions/_utils";

const meritsFlaws = {
	...merits,
	...flaws
};

const defaultRollConfig = {
	name: null,
	action: {},
	stat1: null,
	stat2: null,
	difficulty: 6,
	mods: []
};

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
			rollConfig: {
				...defaultRollConfig
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
				...Object.keys(disciplines)
					.filter((key) => {
						const { _custom = {}, ...charDisciplines } = get(this.data, "advantages.disciplines.list", []);
						return [...Object.keys(charDisciplines), ...Object.keys(_custom)].includes(key);
					})
					.reduce((acc, key) => ({
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
		},
		modsOptions () {
			const meritsFlawsList = get(this.data, "status.meritsFlaws.list._custom", {});

			const meritsFlawsOptions = Object.keys(meritsFlawsList).reduce((acc, key) => {
				const meritFlaw = meritsFlaws[key];

				if (meritFlaw) {
					const { relatedStats, rollModifier } = meritFlaw;

					if (
						relatedStats.includes(this.rollConfig.stat1) ||
						relatedStats.includes(this.rollConfig.stat2)
					) {
						const mods = [];
						const { difficulty, pool, success, botch } = rollModifier;

						const addPlus = num => num > 0 ? `+${num}` : num;

						if (difficulty) {
							mods.push(`${addPlus(difficulty)} Difficulty`);
						}
						if (pool) {
							mods.push(`${addPlus(pool)} Dice Pool`);
						}
						if (success) {
							mods.push(`${addPlus(success)} Success`);
						}
						if (botch) {
							mods.push(`Remove ${botch} Botch`);
						}

						const name = humanize(key);
						const modsOutput = mods.length ? `(${mods.join(", ")})` : "";
						acc[key] = `${name} ${modsOutput}`.trim();
					}
				}

				return acc;
			}, {});

			return meritsFlawsOptions;
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
		onActionClick (name, action) {
			const difficulty = (action.difficulty || defaultRollConfig.difficulty);
			const stat1 = (action.rollStats[0] || null);
			const stat2 = (action.rollStats[1] || null);

			this.rollConfig = { ...this.rollConfig, stat1, stat2, difficulty, action, name };

			if (action.type === "custom") {
				return this.onRoll();
			} else {
				return this.openModal("diceRollModal");
			}
		},
		async onRoll () {
			const { stat1, stat2, difficulty, action: { type, ...action }, name } = this.rollConfig;

			const dicePool = this.stats[stat1] + this.stats[stat2];

			let success = {};
			let result;

			if (type === "custom") {
				result = action.getOutput({ stats: this.stats });
			} else {
				result = rollDice(dicePool);

				success = this.getSuccesses(result, difficulty);
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
		onRollCancel () {
			this.rollConfig = {
				...defaultRollConfig
			}
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
