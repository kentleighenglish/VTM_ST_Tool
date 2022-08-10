<template>
	<div class="characterTabs">
		<CommonSticky :offset-top="20" :z-index="3">
			<div class="characterTabs__list">
				<div
					v-for="tab in tabs"
					:key="tab.key"
					:class="tabClass(tab)"
					@click="onTabClick(tab)"
				>
					{{ tab.label }}
					<CommonLoading v-if="tabsLoading[tab.key]" inline vsmall h-fade colour="white" />
				</div>
			</div>
		</CommonSticky>
		<div class="characterTabs__content">
			<slot :name="currentTab" />
		</div>
	</div>
</template>
<script>
import Vue from "vue";
import { makeClassMods } from "@/mixins/classModsMixin";

export default {
	name: "CharacterTabs",
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
	data: () => ({
		tabsLoading: {}
	}),
	computed: {
		currentTab () {
			const hash = (this.$route.hash || "").replace("#", "");
			return hash || this.defaultTab;
		}
	},
	mounted () {
		this.onTabClick({ key: this.currentTab });
	},
	methods: {
		async onTabClick (tab) {
			if (this.tabsLoading[tab.key]) {
				return;
			}

			const hash = (this.$route.hash || "").replace("#", "");

			if (tab.action) {
				Vue.set(this.tabsLoading, tab.key, true);
				await tab.action();
				Vue.set(this.tabsLoading, tab.key, false);

				return;
			}

			if (tab.key && tab.key !== hash) {
				this.$router.replace({ hash: tab.key || this.defaultTab });
			}
		},
		tabClass (tab) {
			const hash = (this.$route.hash || "").replace("#", "");

			return makeClassMods("characterTabs__item", {
				state: tab => tab.state,
				active: tab => tab.key === hash,
				loading: tab => !!this.tabsLoading[tab.key]
			}, tab);
		}
	}
}
</script>
<style lang="scss">
.characterTabs {
	display: flex;
	height: 100%;
	flex-direction: column;
	// position: relative;

	> .stickyBlock {
		z-index: 2;
	}

	> .characterTabs__content {
		z-index: 1;
		flex-grow: 1;
	}

	&__list {
		display: flex;
	}

	&__item {
		display: block;
		position: relative;
		padding: math.div($gap, 4) $gap;
		margin: 0 math.div($gap, 2);
		white-space: nowrap;
		vertical-align: middle;

		border: 1px solid $grey;
		border-radius: 100px;
		background: $grey-lightest;
		color: $grey-darker;
		cursor: pointer;

		&:before {
			display: block;
			position: absolute;
			top: 0;
			left: 0;
			content: "";
			background: $grey-dark;
			width: 100%;
			height: 100%;

			border-radius: 100px;
			filter: blur(6px);
			opacity: 0.2;
			z-index: -1;
		}

		&--active {
			background: $grey-dark;
			border-color: $grey-darker;
			color: white;
			cursor: default;
		}

		&--loading {
			opacity: 0.7;
			cursor: default;
		}

		&:hover:not(&--active) {
			background: $grey-lighter;
			color: $grey-darkest;
		}

		@include generateStateModifiers() using ($color) {
			border-color: $color;
			color: darken($color, 15%);

			&.characterTabs__item--active {
				background: $color;
				color: white;
			}

			&:before {
				background: $color;
			}

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
