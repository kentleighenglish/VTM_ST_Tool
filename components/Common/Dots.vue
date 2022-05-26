<template>
	<div :class="componentClass">
		<div v-if="maxDots" class="dots">
			<div
				v-for="i in maxDots"
				:key="i"
				:class="dotClass(i)"
				@mouseover="setDotHover(i)"
				@mouseleave="clearDotHover()"
				@click="onClick(i)"
			>
				<div class="dots__dotInner" />
			</div>
		</div>
	</div>
</template>
<script>
import classModsMixin, { makeClassMods } from "@/mixins/classModsMixin";

export default {
	name: "CommonDots",
	mixins: [classModsMixin],
	classMod: {
		baseClass: "dots",
		modifiers: {
			overspend: vm => vm.hoverDot > vm.maxAllowed,
			readOnly: vm => vm.readOnly,
			sm: vm => vm.small
		}
	},
	props: {
		maxDots: {
			type: Number,
			default: 0
		},
		maxAllowed: {
			type: Number,
			default: 0
		},
		currentValue: {
			type: Number,
			default: 0
		},
		readOnly: {
			type: Boolean,
			default: false
		},
		small: {
			type: Boolean,
			default: false
		}
	},
	data: () => ({
		hoverDot: null
	}),
	methods: {
		onClick (i) {
			if (!this.readOnly) {
				this.$emit("click", i);
			}
		},
		dotClass (dotIndex) {
			return makeClassMods("dots__dot", {
				filled: vm => (vm.hoverDot >= vm.currentValue ? vm.hoverDot : vm.currentValue) >= dotIndex,
				inactive: vm => vm.maxAllowed < dotIndex
			}, this);
		},
		setDotHover (i) {
			if (!this.readOnly) {
				this.hoverDot = i;
			}

			this.$emit("hover", i);
		},
		clearDotHover () {
			this.hoverDot = null;

			this.$emit("leave");
		}
	}
}
</script>
<style lang="scss">
.dots {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	justify-content: space-between;

	&--readOnly {
		.dots .dots__dot {
			cursor: default;
		}
	}

	&--sm {
		.dots .dots__dotInner {
			width: 8px;
			height: 8px;
		}
	}

	&--overspend {
		.dots__dot--filled {
			.dots__dotInner {
				background: darken($danger, 10%);
				border-color: darken($danger, 10%);
			}
		}
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

			&--inactive:not(&--filled) {
				opacity: 0.2;
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
