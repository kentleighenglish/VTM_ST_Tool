<template>
	<div class="dotsInput">
		<span class="dotsInput__label">{{ label }}</span>
		<div v-if="maxDots" class="dots">
			<div
				v-for="i in maxDots"
				:key="i"
				:class="{ 'dots__dot': true, 'dots__dot--filled': isDotFilled(i) }"
				@mouseover="setDotHover(i)"
				@mouseleave="clearDotHover()"
				@click="updateValue($event, i)"
			>
				<div class="dots__dotInner" />
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: "FormDots",
	props: {
		_meta: {
			type: Object,
			default: () => ({})
		},
		label: {
			type: String,
			default: null
		},
		value: {
			type: Number,
			default: null
		}
	},
	data: () => ({
		hoverDot: null,
		model: null
	}),
	computed: {
		maxDots () {
			const { maxDots = 5 } = (this._meta?._params || {});
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
		isDotFilled (i) {
			return (this.hoverDot >= this.model ? this.hoverDot : this.model) >= i;
		},
		setDotHover (i) {
			this.hoverDot = i;
		},
		clearDotHover () {
			this.hoverDot = null;
		},
		updateValue (e, value) {
			this.$emit("input", value);
		}
	}
}
</script>
<style lang="scss">
.dotsInput {
	display: flex;
	align-items: center;

	.dotsInput__label {
		display: flex;
		width: 100%;
	}

	.dots {
		display: flex;
		width: 100%;
		max-width: 400px;

		&__dot {
			cursor: pointer;
			padding: 4px;

			&--filled {
				.dots__dotInner {
					background: $grey-dark;
				}
			}
		}

		&__dotInner {
			width: 12px;
			height: 12px;
			border: 1px solid $grey-dark;

			border-radius: 50%;
		}
	}
}
</style>
