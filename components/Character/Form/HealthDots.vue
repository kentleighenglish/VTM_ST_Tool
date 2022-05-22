<template>
	<CharacterFormRootModel>
		<div class="healthDotsInput">
			<span v-if="label" class="healthDotsInput__label">{{ label }}</span>
			<div v-if="parsedDots" class="healthDots">
				<div v-for="(level, index) in parsedDots" :key="index" class="healthDot">
					<span class="healthDot__label">{{ level.label }}</span>
					<span v-if="level.dicePoolMod" class="healthDot__mod">{{ level.dicePoolMod }}</span>
					<div
						:class="dotMod(level)"
						@mouseover="dotHover(index)"
						@mouseleave="clearDotHover()"
						@click="updateValue($event, index)"
					>
						<div class="healthDot__dotInner" />
					</div>
				</div>
			</div>
		</div>
	</CharacterFormRootModel>
</template>
<script>
import { mapActions } from "vuex";
import { makeClassMods } from "@/mixins/classModsMixin";

export default {
	name: "CharacterFormHealthDots",
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
		model: null,
		healthLevels: [
			{ label: "Bruised", dicePoolMod: 0 },
			{ label: "Hurt", dicePoolMod: -1 },
			{ label: "Injured", dicePoolMod: -1 },
			{ label: "Wounded", dicePoolMod: -2 },
			{ label: "Mauled", dicePoolMod: -2 },
			{ label: "Crippled", dicePoolMod: -5 },
			{ label: "Incapacitated", dicePoolMod: 0 }
		]
	}),
	computed: {
		parsedDots () {
			const healthStatus = this.decodeValue();

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
		...mapActions({
			updateMetaField: "characters/updateMetaField"
		}),
		dotMod (dot) {
			return makeClassMods("healthDot__dot", {
				bashing: vm => vm.bashing,
				lethal: vm => vm.lethal,
				agg: vm => vm.agg
			}, dot);
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
		decodeValue () {
			const splitVal = String(this.model || 0).split("").reverse();

			return [
				...Array(Number(splitVal[2] || 0)).fill("agg"),
				...Array(Number(splitVal[1] || 0)).fill("lethal"),
				...Array(Number(splitVal[0] || 0)).fill("bashing")
			];
		},
		encodeValue (array = []) {
			return array.reduce((acc, val) => {
				if (val === "agg") {
					return acc + 100;
				} else if (val === "lethal") {
					return acc + 10;
				} else if (val === "bashing") {
					return acc + 1;
				}

				return acc;
			}, 0);
		},
		resetValue (value) {
			this.$emit("input", value);
		},
		updateValue (e, value) {
			const index = Math.max(value, 0);
			const currentValue = this.decodeValue();
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
			const updatedValue = this.encodeValue(currentValue);

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
