<template>
	<div class="characterActions">
		<div v-for="(actionSection, key) in actions" :key="key" class="characterActions__column">
			<div class="characterActions__columnLabel">
				{{ key | humanize }}
			</div>
			<div v-for="(action, actionKey) in actionSection" :key="actionKey" class="characterActions__action">
				<CommonButton>
					{{ actionKey | humanize }}
				</CommonButton>
			</div>
		</div>
		<div class="characterActions__output">
			OUTPUT
		</div>
	</div>
</template>
<script>
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
			actions
		}
	},
	computed: {
		stats () {
			return {
				strength: this.data?.attributes?.physical?.strength,
				dexterity: this.data?.attributes?.physical?.dexterity,
				stamina: this.data?.attributes?.physical?.stamina,
				charisma: this.data?.attributes?.social?.charisma,
				manipulation: this.data?.attributes?.social?.manipulation,
				appearance: this.data?.attributes?.social?.appearance,
				perception: this.data?.attributes?.mental?.perception,
				intelligence: this.data?.attributes?.mental?.intelligence,
				wits: this.data?.attributes?.mental?.wits,
				alertness: this.data?.abilities?.talents?.alertness,
				athletics: this.data?.abilities?.talents?.athletics,
				awareness: this.data?.abilities?.talents?.awareness,
				brawl: this.data?.abilities?.talents?.brawl,
				empathy: this.data?.abilities?.talents?.empathy,
				expression: this.data?.abilities?.talents?.expression,
				intimidation: this.data?.abilities?.talents?.intimidation,
				leadership: this.data?.abilities?.talents?.leadership,
				streetwise: this.data?.abilities?.talents?.streetwise,
				subterfuge: this.data?.abilities?.talents?.subterfuge,
				animalKen: this.data?.abilities?.skills?.animalKen,
				crafts: this.data?.abilities?.skills?.crafts,
				drive: this.data?.abilities?.skills?.drive,
				etiquette: this.data?.abilities?.skills?.etiquette,
				firearms: this.data?.abilities?.skills?.firearms,
				larceny: this.data?.abilities?.skills?.larceny,
				melee: this.data?.abilities?.skills?.melee,
				performance: this.data?.abilities?.skills?.performance,
				stealth: this.data?.abilities?.skills?.stealth,
				survival: this.data?.abilities?.skills?.survival,
				academics: this.data?.abilities?.knowledges?.academics,
				computer: this.data?.abilities?.knowledges?.computer,
				finance: this.data?.abilities?.knowledges?.finance,
				investigation: this.data?.abilities?.knowledges?.investigation,
				law: this.data?.abilities?.knowledges?.law,
				medicine: this.data?.abilities?.knowledges?.medicine,
				occult: this.data?.abilities?.knowledges?.occult,
				politics: this.data?.abilities?.knowledges?.politics,
				science: this.data?.abilities?.knowledges?.science,
				technology: this.data?.abilities?.knowledges?.technology,
				...Object.keys(this.data?.advantages?.disciplines?.list || {}).reduce((acc, key) => (key === "_custom"
					? acc
					: { ...acc, [key]: this.data?.advantages?.disciplines?.list[key] || 0 }
				), {})
			}
		}
	},
	methods: {
		getHealthMod () {
			const healthArray = decodeHealthValue(this.data?.status?.other?.health);

			const healthStatus = healthLevels[healthArray.length - 1];

			return healthStatus?.dicePoolMod || 0;
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
}
</style>
