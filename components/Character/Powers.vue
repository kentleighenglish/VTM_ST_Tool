<template>
	<div class="characterPowers">
		<div v-if="sortedDisciplines.length" class="characterPowers__navList">
			<div :class="navListItemClass({ key: null })" @click="setFilter(null)">
				<span>All</span>
			</div>
			<div
				v-for="d in sortedDisciplines"
				:key="`navList_${d.key}`"
				:class="navListItemClass(d)"
				@click="setFilter(d.key)"
			>
				<span>{{ d.label }}</span>
			</div>
		</div>
		<div v-if="sortedPowers.length" class="characterPowers__list">
			<div v-for="(power, $index) in sortedPowers" :key="$index" class="powerItem">
				<div class="powerItem__label">
					{{ power.label }}
				</div>
				<CommonDots
					:small="true"
					:read-only="true"
					:max-dots="power.dot"
					:current-value="power.dot"
				/>
				<div class="powerItem__description">
					{{ power.description }}
				</div>
			</div>
		</div>
		<div v-if="!sortedDisciplines.length && !sortedPowers.length" class="characterPowers__none">
			<span>No disciplines/powers for this character</span>
		</div>
	</div>
</template>
<script>
import { makeClassMods } from "@/mixins/classModsMixin";
import * as disciplines from "@/data/advantages/disciplines";

export default {
	name: "CharacterPowers",
	props: {
		data: {
			type: Object,
			default: () => ({})
		}
	},
	data: () => ({
		filter: null
	}),
	computed: {
		disciplines () {
			const { advantages: { disciplines: { list = {} } = {} } = {} } = (this.data || {});

			return list;
		},
		sortedDisciplines () {
			return Object.keys(this.disciplines)
				.filter(key => key !== "_custom")
				.reduce((acc, key) => ([
					...acc,
					{
						key,
						label: (disciplines[key] || {}).label
					}
				]), []);
		},
		sortedPowers () {
			return Object.keys(this.disciplines)
				.filter(key => key !== "_custom" && (!this.filter || this.filter === key))
				.reduce((acc, key) => {
					const dotLevel = this.disciplines[key];
					const powers = (disciplines[key] || {}).dots || [];

					return [
						...acc,
						...powers.filter(power => power.dot <= dotLevel)
					];
				}, [])
				.sort((a, b) => a.dot > b.dot ? 1 : -1);
		}
	},
	methods: {
		setFilter (key) {
			this.filter = key;
		},
		navListItemClass (item) {
			return makeClassMods("characterPowers__navListItem", {
				active: i => i.key === this.filter
			}, item);
		}
	}
}
</script>
<style lang="scss">
.characterPowers {
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

			&:hover:not(&--active) {
				cursor: pointer;
				background: $grey-light;
			}

			&--active {
				background: $grey-light;
			}
		}
	}

	&__list {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		grid-gap: $gap;
		padding: 0 $gap * 2;

		.powerItem {
			width: 100%;
			height: 200px;
			overflow: hidden;

			&__label {
				font-size: 1.1em;
				font-weight: 600;
			}
		}
	}
}
</style>
