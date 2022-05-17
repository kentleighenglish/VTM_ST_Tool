<template>
	<div class="sheetTabs">
		<div class="sheetTabs__list">
			<div
				v-for="tab in tabs"
				:key="tab.key"
				:class="tabClass(tab)"
				@click="onTabClick(tab)"
			>
				{{ tab.label }}
			</div>
		</div>
		<div class="sheetTabs__content">
			<slot :name="currentTab" />
		</div>
	</div>
</template>
<script>
import { makeMods } from "@/mixins/classModsMixin";

export default {
	name: "SheetTabs",
	props: {
		tabs: {
			type: Array,
			default: () => ([])
		},
		defaultTab: {
			type: String,
			default: null
		}
	},
	computed: {
		currentTab () {
			const hash = (this.$route.hash || "").replace("#", "");
			return hash || this.defaultTab;
		}
	},
	methods: {
		async onTabClick (tab) {
			if (tab.action) {
				await tab.action();

				return;
			}

			if (tab.key) {
				this.$router.replace({ hash: tab.key || this.defaultTab });
			}
		},
		tabClass (tab) {
			const hash = (this.$route.hash || "").replace("#", "");

			return makeMods("sheetTabs__item", {
				state: tab => tab.state,
				active: tab => tab.key === hash
			}, tab);
		}
	}
}
</script>
<style lang="scss">
.sheetTabs {
	&__list {
		display: flex;
	}

	&__item {
		display: block;
		padding: math.div($gap, 4) $gap;
		margin: 0 math.div($gap, 2);

		border: 1px solid $grey;
		border-radius: 100px;
		color: $grey-darker;
		cursor: pointer;

		&--active {
			background: $grey-dark;
			border-color: $grey-darker;
			color: white;
			cursor: default;
		}

		&:hover:not(&--active) {
			background: $grey-lighter;
			color: $grey-darkest;
		}

		@include generateStateModifiers() using ($color) {
			border-color: $color;
			color: darken($color, 15%);

			&:hover:not(&--active) {
				background: $color;
				@if (lightness($color) > 70) {
					color: darken($color, 15%);
				} @else {
					color: white;

				}
			}
		}
	}
}
</style>
