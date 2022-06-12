<template>
	<FormRootModel>
		<div class="statusDotsInput">
			<span v-if="label" class="statusDotsInput__label">{{ label }}</span>
			<div v-if="maxDots" class="statusDots__Dots">
				<CommonStatusDots
					:max-dots="maxDots"
					:max-allowed="maxDots"
					:current-value="model"
					@click="updateValue"
					@hover="onDotHover"
					@leave="onDotLeave"
				/>
			</div>
		</div>
	</FormRootModel>
</template>
<script>
import { mapActions } from "vuex";

export default {
	name: "FormStatusDots",
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
			return this.model >= i;
		},
		isDotInterstitial (i) {
			return this.model >= i;
		},
		onDotHover (i) {
			const { description } = this.meta;
			if (description) {
				const text = typeof description === "function" ? description(this.name, i) : description;

				this.updateMetaField({ text });
			}
		},
		onDotLeave () {
		},
		updateValue (value) {
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
}
</style>
