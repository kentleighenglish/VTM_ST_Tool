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
		<div class="characterActions__output">
			<div v-if="output.length" class="outputList">
				<div v-for="(item, index) in output" :key="index" class="outputList__item">
					<div class="outputList__itemName">
						{{ item.name | humanize }}
						<span class="outputList__itemTimestamp">{{ item.timestamp | date('HH:mm:ss') }}</span>
					</div>
					<div v-if="item.type === 'diceRoll'" class="outputList__diceRoll">
						<div v-for="(d, i) in item.result" :key="i" :class="diceResultClassMod(d)">
							{{ d }}
						</div>
					</div>
					<div v-if="item.type === 'custom'" class="outputList__customOutput">
						{{ item.result }}
					</div>
					<div :class="successesClassMod(item.successStatus)">
						{{ item.successOutput }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapActions } from "vuex";
import { get } from "lodash";
import { makeClassMods } from "@/mixins/classModsMixin";
import { decodeHealthValue } from "@/utils/parsers";
import { healthLevels } from "@/data/status";
import * as disciplines from "@/data/advantages/disciplines";
import humanize from "@/filters/humanize";
import date from "@/filters/date";
import actions from "@/data/actions";

export default {
	name: "SheetActions",
	filters: {
		humanize,
		date
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
			output: []
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
				...Object.keys(disciplines).reduce((acc, key) => ({
					...acc,
					[key]: get(this.data, `advantages.disciplines.list.${key}`, 0)
				}), {})
			}
		}
	},
	methods: {
		...mapActions({
			saveAction: "characters/saveAction"
		}),
		diceResultClassMod (roll) {
			return makeClassMods("outputList__diceRollItem", {
				crit: vm => vm === 10,
				fail: vm => vm === 1
			}, roll);
		},
		successesClassMod (val) {
			return makeClassMods("outputList__successes", {
				crit: vm => vm === "crit",
				fail: vm => vm === "botch"
			}, val);
		},
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
			const result = action.getOutput(this.stats, {});
			const type = action.type;

			let success = null;
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

	&__output {
		width: 500px;
		height: 100%;
		flex-shrink: 0;
		padding: $gap * 2;

		@include realShadow($grey-dark);
		background: $grey-lighter;
		border-radius: $global-border-radius;
	}

	.outputList {

		&__item {
			padding: math.div($gap, 2) 0;

			&:not(:last-child) {
				border-bottom: 2px solid $grey;
			}

			&Name {
				font-size: 1.1em;
			}

			&Timestamp {
				font-size: 0.7em;
				color: $grey;
			}
		}

		&__customOutput {
			font-size: 1.2em;
			font-weight: 700;
		}

		&__successes {
			font-weight: 700;

			&--crit {
				color: darken(saturate($success, 30%), 15%);
			}
			&--fail {
				color: $danger;
			}
		}

		&__diceRollItem {
			display: inline-block;
			font-size: 1.2em;
			font-weight: 700;

			&--crit {
				color: darken(saturate($success, 30%), 15%);
			}
			&--fail {
				color: $danger;
			}

			&:not(:last-of-type) {
				&:after {
					display: inline-block;
					content: "+";
					margin: 0 math.div($gap, 2);
					color: $grey-darkest;
				}
			}
		}
	}
}
</style>
