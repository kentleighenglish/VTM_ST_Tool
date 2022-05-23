<template>
	<CharacterFormRootModel>
		<div :class="componentClass">
			<span class="dotsInput__label">{{ label }}</span>
			<div v-if="maxDots" class="dots">
				<div
					v-for="i in maxDots"
					:key="i"
					:class="dotClass(i)"
					:create-mode="createMode"
					:xp-check="xpCheck"
					:xp-spend-update="xpSpendUpdate"
					:xp-spend-reset="xpSpendReset"
					@mouseover="setDotHover(i)"
					@mouseleave="clearDotHover()"
					@click="updateValue(i)"
				>
					<div class="dots__dotInner" />
				</div>
			</div>
		</div>
	</CharacterFormRootModel>
</template>
<script>
import { mapActions } from "vuex";
import classModsMixin, { makeClassMods } from "@/mixins/classModsMixin";

export default {
	name: "CharacterFormDots",
	mixins: [classModsMixin],
	classMod: {
		baseClass: "dotsInput",
		modifiers: {
			overspend: vm => vm.hoverDot > vm.maxSpendDots
		}
	},
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
		originalValue: {
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
		},
		xpSpendReset: {
			type: Function,
			default: () => {}
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
		},
		maxSpendDots () {
			const { maxSpendDots = 0 } = (this.meta?.params || {});
			return maxSpendDots;
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
			pushToastMessage: "toast/pushMessage"
		}),
		dotClass (dotIndex) {
			return makeClassMods("dots__dot", {
				filled: vm => (vm.hoverDot >= vm.model ? vm.hoverDot : vm.model) >= dotIndex,
				inactive: vm => vm.maxSpendDots < dotIndex
			}, this);
		},
		setDotHover (i) {
			this.hoverDot = i;
		},
		clearDotHover () {
			this.hoverDot = null;
		},
		resetValue () {
			this.$emit("input", this.originalValue);
			this.xpSpendReset(this.name);
		},
		updateValue (value) {
			const { getXpCost } = this.meta
			let xpCost = 0;

			if (getXpCost) {
				xpCost = getXpCost({ current: this.model || 0, target: value, propPath: [this.name] });
			}

			if (this.adminMode || (this.xpCheck(xpCost) && (this.createMode || this.model < value))) {
				if (value === 1 && this.model === 1) {
					this.$emit("input", 0);
				} else {
					this.$emit("input", value);
				}

				if (!this.createMode) {
					this.xpSpendUpdate(this.name, this.label || this.name, value, xpCost);
				}
			} else if (!this.xpCheck(xpCost)) {
				this.pushToastMessage({
					type: "warning",
					body: `Not enough XP, you need ${xpCost}xp`
				});
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

	&--overspend {
		.dots {
			.dots__dot--filled {
				.dots__dotInner {
					background: darken($danger, 10%);
					border-color: darken($danger, 10%);
				}
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
