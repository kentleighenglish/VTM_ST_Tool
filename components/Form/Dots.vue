<template>
	<div class="dotsInput">
		<span class="dotsInput__label">{{ label }}</span>
		<div class="dots">
			<div
				v-for="i in 5"
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
		dotCount: 5,
		hoverDot: null,
		model: null
	}),
	created () {
		this.model = this.value;
	},
	mounted () {
		this.model = this.value;
	},
	methods: {
		isDotFilled (i) {
			console.log(this.hoverDot, this.model);
			return (this.hoverDot >= this.model ? this.hoverDot : this.model) >= i;
		},
		setDotHover (i) {
			this.hoverDot = i;
		},
		clearDotHover () {
			this.hoverDot = null;
		},
		updateValue (e, value) {
			this.model = value;

			this.$emit("input", this.model);
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
