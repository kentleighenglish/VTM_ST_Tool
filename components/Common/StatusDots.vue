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
			return makeClassMods("statusDots__dot", {
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

	&--overspend {
		.statusDots__dot--filled {
			.statusDots__dotInner {
				background: darken($danger, 10%);
				border-color: darken($danger, 10%);
			}
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
		}

		&__dotInner {
			width: 12px;
			height: 12px;
			border: 1px solid $grey-dark;
		}
	}
}
</style>
