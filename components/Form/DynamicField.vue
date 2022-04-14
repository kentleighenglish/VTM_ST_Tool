<template>
	<div class="dynamicField">
		<FormFields
			v-if="generatedFields"
			v-model="model"
			:fields="generatedFields"
			class-name="dynamicField__fields"
			@input="handleChange($event)"
		/>
		<div class="dynamicField__customAdd">
			<FormInput
				v-if="keyOptions"
				v-model="customAdd"
				name="dynamicFieldCustom"
				:type="keyOptions ? 'select' : 'text'"
				:options="keyOptions"
			/>
			<FormButton
				:disabled="!customAdd"
				@click="addCustom($event)"
			>
				Add
			</FormButton>
		</div>
	</div>
</template>
<script>
export default {
	name: "DynamicField",
	props: {
		name: {
			type: String,
			default: null
		},
		value: {
			type: Object,
			default: null
		},
		// eslint-disable-next-line vue/prop-name-casing
		_meta: {
			type: Object,
			default: () => ({})
		}
	},
	data: () => ({
		model: null,
		customAdd: null
	}),
	computed: {
		fieldType () {
			return this._meta.fieldType;
		},
		fieldsMeta () {
			return this._meta?._params?._fieldsMeta || {};
		},
		keyOptions () {
			const options = this._meta?.keyOptions;

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
			return this._meta?._params?.defaultFields || {};
		},
		generatedFields () {
			const { _custom = [] } = (this.model || {});
			const options = this._meta?.keyOptions;

			return {
				...Object.keys(this.defaultFields).reduce((acc, key) => ({
					...acc,
					[key]: {
						...this.defaultFields[key],
						_meta: {
							...this.defaultFields[key]._meta,
							...this.fieldsMeta
						}
					}
				}), {}),
				..._custom.reduce((acc, key) => {
					if (!this.defaultFields[key]) {
						const label = options ? options[key] : key;

						acc[key] = {
							label,
							type: this.fieldType,
							default: null,
							_meta: {
								...this.fieldsMeta
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
		updateValue (value) {
			this.$emit("input", {
				...value,
				_custom: (value._custom || [])
			});
		},
		handleChange (e) {
			this.$emit("change", e);
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
