<template>
	<div class="statusDotsInput">
		<span v-if="label" class="statusDotsInput__label">{{ label }}</span>
		<div v-if="maxDots" class="statusDots">
			<div
				v-for="i in maxDots"
				:key="i"
				:class="{
					'statusDots__dot': true,
					'statusDots__dot--filled': isDotFilled(i),
					'statusDots__dot--interstitial': isDotInterstitial(i)
				}"
				@mouseover="dotHover(i)"
				@mouseleave="clearDotHover()"
				@click="updateValue($event, i)"
			>
				<div class="statusDots__dotInner" />
			</div>
		</div>
		<div v-if="showClear" class="statusDotsInput__clear" />
	</div>
</template>
<script>
import { mapActions } from "vuex";

export default {
	name: "CharacterFormStatusDots",
	props: {
		meta: {
			type: Object,
			default: () => ({})
		},
		name: {
			type: String,
			default: null
		},
		label: {
			type: String,
			default: null
		},
		value: {
			type: Number,
			default: null
		},
		createMode: Boolean,
		adminMode: Boolean,
		xpCheck: {
			type: Function,
			default: () => {}
		},
		xpSpendUpdate: {
			type: Function,
			default: () => {}
		}
	},
	data: () => ({
		model: null,
		showClear: false
	}),
	computed: {
		maxDots () {
			const { maxDots = 5 } = (this.meta?.params || {});
			return maxDots;
		}
	},
	watch: {
		value (v) {
			this.model = v;
		}
	},
	created () {
		this.model = this.value;
	},
	mounted () {
		this.model = this.value;
	},
	methods: {
		...mapActions({
			updateMetaField: "characters/updateMetaField"
		}),
		isDotFilled (i) {
			return this.model >= i;
		},
		isDotInterstitial (i) {
			return this.model >= i;
		},
		dotHover (i) {
			const { description } = this.meta;
			if (description) {
				const text = typeof description === "function" ? description(this.name, i) : description;

				this.updateMetaField({ text });
			}
		},
		clearDotHover () {
		},
		updateValue (e, value) {
			if (value === 1 && this.model === 1) {
				this.$emit("input", 0);
			} else {
				this.$emit("input", value);
			}
		}
	}
}
</script>
<style lang="scss">
.statusDotsInput {
	position: relative;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	justify-content: space-between;

	&__label {
		display: flex;
	}

	&__clear {
		position: absolute;
		top: 0;
		left: 0;
		width: 12px;
		height: 12px;
		margin: math.div($gap, 4);
		background: $grey-lightest;
		cursor: pointer;

		&:before {
			display: block;
			content: "X";
			position: absolute;
			font-size: 18px;
			line-height: 15px;
		}
	}

	.statusDots {
		display: flex;

		&__dot {
			cursor: pointer;
			padding: 4px;

			&--filled {
				.statusDots__dotInner {
					background: $grey-dark;
				}
			}
		}

		&__dotInner {
			width: 12px;
			height: 12px;
			border: 1px solid $grey-dark;
		}
	}
}
</style>
