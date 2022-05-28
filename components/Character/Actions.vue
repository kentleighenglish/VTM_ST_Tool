<template>
	<div class="characterActions">
		<div v-for="(actionSection, key) in actions" :key="key" class="characterActions__column">
			<div class="characterActions__columnLabel">
				{{ key | humanize }}
			</div>
			<div v-for="(action, actionKey) in actionSection" :key="actionKey" class="characterActions__action">
				<CommonButton state="success" gradient @click="onRoll(action)">
					{{ actionKey | humanize }}
				</CommonButton>
			</div>
		</div>
		<div class="characterActions__output">
			OUTPUT
			<div v-if="output.diceResult.length" class="diceResult">
				<div v-for="(d, i) in output.diceResult" :key="i" :class="diceResultClassMod(d)">
					{{ d }}
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { get } from "lodash";
import { makeClassMods } from "@/mixins/classModsMixin";
import { decodeHealthValue } from "@/utils/parsers";
import { healthLevels } from "@/data/status";
import humanize from "@/filters/humanize";
import actions from "@/data/actions";

export default {
	name: "SheetActions",
	filters: {
		humanize
	},
	props: {
		data: {
			type: Object,
			default: () => ({})
		}
	},
	data () {
		return {
			actions,
			output: {
				diceResult: []
			}
		}
	},
	computed: {
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
				...Object.keys(get(this.data, "advantages.disciplines.list", {})).reduce((acc, key) => (key === "_custom"
					? acc
					: { ...acc, [key]: get(this.data, `advantages.disciplines.list.${key}`, 0) }
				), {})
			}
		}
	},
	methods: {
		diceResultClassMod (roll) {
			return makeClassMods("diceResult__roll", {
				crit: vm => vm === 10,
				fail: vm => vm === 1
			}, roll);
		},
		getHealthMod () {
			const healthArray = decodeHealthValue(get(this.data, "status.other.health", null));

			const healthStatus = (healthLevels[healthArray.length - 1] || {});

			return healthStatus.dicePoolMod || 0;
		},
		onRoll (action) {
			const dicePool = action.getDicePool(this.stats, {});
			this.output.diceResult = [];

			for (let i = 0; i < dicePool; i++) {
				this.output.diceResult.push(Math.ceil(Math.random() * 10));
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

	&__output {
		width: 500px;
		height: 100%;
		flex-shrink: 0;
		padding: $gap * 2;

		@include realShadow($grey-dark);
		background: $grey-lighter;
		border-radius: $global-border-radius;
	}

	.diceResult {

		&__roll {
			display: inline-block;
			font-size: 1.2em;
			font-weight: 700;

			&--crit {
				color: $success;
			}
			&--fail {
				color: $danger;
			}
		}
	}
}
</style>
