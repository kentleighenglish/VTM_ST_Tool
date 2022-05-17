<template>
	<div class="sheetPowers">
		<div v-if="sortedPowers.length" class="sheetPowers__navList">
			<div class="sheetPowers__navListItem">
				<span>All</span>
			</div>
			<div v-for="p in sortedPowers" :key="`navList_${p.key}`" class="sheetPowers__navListItem">
				<span>{{ p.label }}</span>
			</div>
		</div>
		<div v-if="sortedPowers.length" class="sheetPowers__list">
		</div>
		<div v-if="!sortedPowers.length" class="sheetPowers__none">
			<span>No disciplines/powers for this character</span>
		</div>
	</div>
</template>
<script>
import * as disciplines from "@/data/advantages/disciplines";

export default {
	name: "SheetPowers",
	props: {
		data: {
			type: Object,
			default: () => ({})
		}
	},
	computed: {
		sortedPowers () {
			const {
				advantages: {
					disciplines: { list: charDisciplines = {} } = {}
				} = {}
			} = (this.data || {});

			return Object.keys(charDisciplines).filter(key => key !== "_custom").reduce((acc, key) => {
				const dotLevel = charDisciplines[key];
				const label = (disciplines[key] || {}).label;
				const powers = (disciplines[key] || {}).dots || [];

				return [
					...acc,
					{
						key,
						label,
						powers: powers.filter(power => power.dot <= dotLevel)
					}
				]
			}, []);
		}
	}
}
</script>
<style lang="scss">
.sheetPowers {
	padding: $gap * 2 $gap;
	display: grid;
	grid-template-columns: 200px 1fr;

	&__none {
		display: flex;
		width: 100%;
		height: 100%;

		justify-content: center;
		align-items: center;
	}

	&__navList {
		display: flex;
		flex-direction: column;

		&Item {
			padding: math.div($gap, 2);
			margin: math.div($gap, 4) 0;

			font-size: 1em;
			text-align: center;
			background: $grey-lighter;
		}
	}

	&__list {
		display: flex;
	}
}
</style>
