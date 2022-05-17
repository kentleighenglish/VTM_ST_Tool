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
import { mapActions } from "vuex";

export default {
	name: "CharacterFormDots",
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
		}
	},
	data: () => ({
		hoverDot: null,
		model: null
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
			return (this.hoverDot >= this.model ? this.hoverDot : this.model) >= i;
		},
		setDotHover (i) {
			const { description } = this.meta;
			if (description) {
				const text = typeof description === "function" ? description(this.name, i) : description;

				this.updateMetaField({ text });
			}

			this.hoverDot = i;
		},
		clearDotHover () {
			this.hoverDot = null;
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
.dotsInput {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	justify-content: space-between;

	.dotsInput__label {
		display: flex;
	}

	.dots {
		display: flex;

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
