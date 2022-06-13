<template>
	<div :class="componentClass">
		<div v-if="maxDots" class="statusDots">
			<div
				v-for="i in maxDots"
				:key="i"
				:class="dotClass(i)"
				@mouseover="setDotHover(i)"
				@mouseleave="clearDotHover()"
				@click="onClick(i)"
			>
				<div class="statusDots__dotInner" />
			</div>
		</div>
	</div>
</template>
<script>
import classModsMixin, { makeClassMods } from "@/mixins/classModsMixin";

export default {
	name: "CommonStatusDots",
	mixins: [classModsMixin],
	classMod: {
		baseClass: "statusDots",
		modifiers: {
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
		},
		buff: {
			type: Number,
			default: 0
		},
		debuff: {
			type: Number,
			default: 0
		}
	},
	data: () => ({
		hoverDot: null
	}),
	computed: {
		dotValue () {
			return this.currentValue + this.buff
		}
	},
	methods: {
		onClick (i) {
			if (!this.readOnly) {
				this.$emit("click", i);
			}
		},
		dotClass (dotIndex) {
			return makeClassMods("statusDots__dot", {
				filled: vm => vm.currentValue >= dotIndex,
				inactive: vm => vm.maxAllowed < dotIndex,
				buff: vm => dotIndex > vm.currentValue && dotIndex <= vm.currentValue + vm.buff,
				debuff: vm => (dotIndex > (vm.currentValue - vm.debuff)) && dotIndex <= vm.currentValue
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
.statusDots {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	justify-content: space-between;

	&--readOnly {
		.statusDots .statusDots__dot {
			cursor: default;
		}
	}

	&--sm {
		.statusDots .statusDots__dotInner {
			width: 8px;
			height: 8px;
		}
	}

	.statusDots {
		display: grid;
		grid-template-columns: repeat(10, minmax(0, 1fr));

		&__dot {
			cursor: pointer;
			padding: 4px;

			&--filled {
				.statusDots__dotInner {
					background: $grey-dark;
				}
			}

			&--buff {
				.statusDots__dotInner {
					background-color: $special-light;;
				}
			}

			&--debuff {
				.statusDots__dotInner {
					background-color: $danger;
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
