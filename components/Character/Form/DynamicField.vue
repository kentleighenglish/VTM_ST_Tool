<template>
	<div class="dynamicField">
		<CharacterFormFields
			v-if="generatedFields"
			v-model="model"
			:original-value="originalValue"
			:fields="generatedFields"
			class-name="dynamicField__fields"
			:create-mode="createMode"
			:admin-mode="adminMode"
			:xp-check="xpCheck"
			:xp-spend-update="xpSpendUpdate"
			:xp-spend-reset="xpSpendReset"
			@input="handleChange($event)"
		/>
		<div class="dynamicField__customAdd">
			<CharacterFormInput
				v-if="keyOptions"
				v-model="customAdd"
				name="dynamicFieldCustom"
				:type="keyOptions ? 'select' : 'text'"
				:options="keyOptions"
				:create-mode="createMode"
				:admin-mode="adminMode"
				:xp-check="xpCheck"
				:xp-spend-update="xpSpendUpdate"
				:xp-spend-reset="xpSpendReset"
			/>
			<CharacterFormButton
				:disabled="isAddDisabled"
				@click="addCustom($event)"
				@disabledClick="addCustomFailed($event)"
			>
				Add
			</CharacterFormButton>
		</div>
	</div>
</template>
<script>
import { mapActions } from "vuex";

export default {
	name: "CharacterFormDynamicField",
	props: {
		name: {
			type: String,
			default: null
		},
		value: {
			type: Object,
			default: null
		},
		originalValue: {
			type: Object,
			default: null
		},
		meta: {
			type: Object,
			default: () => ({})
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
		customAdd: null
	}),
	computed: {
		addCost () {
			const getAdd = this.meta?.getXpAddCost;

			return getAdd ? getAdd() : 0;
		},
		isAddDisabled () {
			return !this.xpCheck(this.addCost) || !this.customAdd
		},
		fieldType () {
			return this.meta.fieldType;
		},
		fieldsMeta () {
			return this.meta?.params?.fieldsMeta || {};
		},
		keyOptions () {
			const options = this.meta?.keyOptions;

			return Object.keys(options)
				.filter((key) => {
					return (!this.defaultFields[key] && !(this.model?._custom || []).includes(key));
				})
				.reduce((acc, key) => ({
					...acc,
					[key]: options[key]
				}), {});
		},
		defaultFields () {
			return this.meta?.params?.defaultFields || {};
		},
		generatedFields () {
			const { _custom = [] } = (this.model || {});
			const options = this.meta?.keyOptions;

			return {
				...Object.keys(this.defaultFields).reduce((acc, key) => ({
					...acc,
					[key]: {
						...this.defaultFields[key],
						name: key,
						meta: {
							...this.defaultFields[key].meta,
							...this.fieldsMeta(key)
						}
					}
				}), {}),
				..._custom.reduce((acc, key) => {
					if (!this.defaultFields[key]) {
						const label = options ? options[key] : key;

						acc[key] = {
							name: key,
							label,
							type: this.fieldType,
							default: null,
							meta: {
								...this.fieldsMeta(key)
							}
						}
					}

					return acc;
				}, {})
			}
		}
	},
	watch: {
		value (v) {
			this.model = {
				...v,
				_custom: (v._custom || [])
			};
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
		updateValue (value) {
			this.$emit("input", {
				...value,
				_custom: (value._custom || [])
			});
		},
		handleChange (e) {
			this.$emit("change", e);

			this.updateValue(e);
		},
		addCustom (e) {
			if (this.customAdd) {
				const _custom = [
					...(this?.model?._custom || []),
					this.customAdd
				];

				this.updateValue({
					...this.model,
					_custom
				});

				this.customAdd = null;
			}
		},
		addCustomFailed (e) {
			const xpCost = this.addCost;
			if (!this.xpCheck(xpCost)) {
				this.pushToastMessage({
					type: "warning",
					body: `You need ${xpCost}xp to add this`
				});
			}
		}
	}
}
</script>
<style lang="scss">
	.dynamicField {
		display: block;
		width: 100%;
		margin: math.div($gap, 2) 0;

		&__customAdd {
			display: flex;
		}
	}
</style>
