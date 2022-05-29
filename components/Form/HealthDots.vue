<template>
	<FormRootModel>
		<div class="healthDotsInput">
			<span v-if="label" class="healthDotsInput__label">{{ label }}</span>
			<div v-if="parsedDots" class="healthDots">
				<div v-for="(level, index) in parsedDots" :key="index" class="healthDot">
					<span class="healthDot__label">{{ level.label }}</span>
					<span v-if="level.dicePoolMod" class="healthDot__mod">{{ level.dicePoolMod }}</span>
					<div
						:class="dotMod(level)"
						@click="updateValue($event, index)"
					>
						<div class="healthDot__dotInner" />
					</div>
				</div>
			</div>
		</div>
	</FormRootModel>
</template>
<script>
import { makeClassMods } from "@/mixins/classModsMixin";
import { encodeHealthValue, decodeHealthValue } from "@/utils/parsers";
import { healthLevels } from "@/data/status";

export default {
	name: "FormHealthDots",
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
		disableMetaDisplay: Boolean,
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
		model: null,
		healthLevels
	}),
	computed: {
		parsedDots () {
			const healthStatus = decodeHealthValue(this.model);

			return this.healthLevels.reduce((acc, level, index) => ([
				...acc,
				{
					...level,
					bashing: healthStatus[index] === "bashing",
					lethal: healthStatus[index] === "lethal",
					agg: healthStatus[index] === "agg"
				}
			]), []);
		},
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
		dotMod (dot) {
			return makeClassMods("healthDot__dot", {
				bashing: vm => vm.bashing,
				lethal: vm => vm.lethal,
				agg: vm => vm.agg
			}, dot);
		},
		resetValue (value) {
			this.$emit("input", value);
		},
		updateValue (e, value) {
			const index = Math.max(value, 0);
			const currentValue = decodeHealthValue(this.model);
			const healthState = (currentValue[index] || null);
			let newState = null;

			if (healthState === null) {
				newState = "bashing";
			} else if (healthState === "bashing") {
				newState = "lethal";
			} else if (healthState === "lethal") {
				newState = "agg";
			}

			currentValue[index] = newState;
			const updatedValue = encodeHealthValue(currentValue);

			this.$emit("input", updatedValue);
		}
	}
}
</script>
<style lang="scss">
.healthDotsInput {
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

	.healthDots {
		width: 100%;
		display: flex;
		flex-direction: column;

		.healthDot {
			width: 100%;
			display: flex;

			&__label {
				width: 100%;
			}

			&__mod {
				color: $grey;
				margin-right: $gap;
			}

			&__dot {
				cursor: pointer;
				padding: 4px;

				&--bashing {
					.healthDot__dotInner {
						background: linear-gradient(to left top, transparent 0%,transparent 49.9%,$grey-darkest 50%,$grey-darkest 51%,transparent 51.1%,transparent 100%);
					}
				}
				&--lethal {
					.healthDot__dotInner {
						background: linear-gradient(to left top, transparent 0%,transparent 49.9%,$grey-darkest 50%,$grey-darkest 51%,transparent 51.1%,transparent 100%),
						linear-gradient(to right top, transparent 0%,transparent 49.9%,$grey-darkest 50%,$grey-darkest 51%,transparent 51.1%,transparent 100%);
					}
				}
				&--agg {
					.healthDot__dotInner {
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
}
</style>
