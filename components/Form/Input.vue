<template>
	<FormRootModel>
		<div :class="componentClass">
			<label :for="name">
				<span v-if="label" class="formInput__label">{{ label }}</span>
				<div class="formInput__field">
					<input
						v-if="plainType"
						v-model="model"
						:type="type"
						:disabled="isDisabled"
						:accept="accept"
						:max="max"
						:min="min"
						@input="updateValue($event.target.value)"
						@change="handleChange($event)"
					></input>
					<textarea
						v-if="type === 'textarea'"
						v-model="model"
						:disabled="isDisabled"
						@input="updateValue($event.target.value)"
						@change="handleChange($event)"
					/>
					<Multiselect
						v-if="type === 'select'"
						:value="selectValue"
						:disabled="disabled"
						:multiple="!!multiple"
						:options="parsedOptions"
						:searchable="false"
						:close-on-select="!multiple"
						@input="updateValue"
					>
						<template #option="{ option }">
							<span>{{ option.label }}</span>
						</template>
					</Multiselect>
				</div>
			</label>
		</div>
	</FormRootModel>
</template>
<script>
import Multiselect from "vue-multiselect";
import classModsMixin from "@/mixins/classModsMixin";

export default {
	name: "FormInput",
	mixins: [classModsMixin],
	components: {
		Multiselect
	},
	classMod: {
		baseClass: "formInput",
		modifiers: {
			type: vm => vm.type
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
		type: {
			type: String,
			default: "text"
		},
		accept: {
			type: String,
			default: null
		},
		options: {
			type: Object,
			default: () => ({})
		},
		max: {
			type: Number,
			default: null
		},
		min: {
			type: Number,
			default: null
		},
		multiple: {
			type: Boolean,
			default: false
		},
		value: {
			type: [Number, String, Array],
			default: null
		},
		originalValue: {
			type: [Number, String, Array],
			default: null
		},
		disabled: {
			type: Boolean,
			default: false
		},
		disableMetaDisplay: Boolean,
		disableReset: Boolean,
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
		passwordVisible: false
	}),
	computed: {
		plainType () {
			return !["select", "textarea"].includes(this.type);
		},
		parsedOptions () {
			return Object.keys(this.options || {}).reduce((acc, key) => ([
				...acc,
				{ key, label: this.options[key] }
			]), []);
		},
		isDisabled () {
			const canEdit = this.meta?.params?.canEdit;
			return this.disabled || (canEdit === undefined ? false : !canEdit);
		},
		selectValue () {
			if (!this.model) {
				return null;
			}
			const value = Array.isArray(this.model) ? this.model : [this.model];
			return value.map(v => this.options[v]);
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
		updateValue (value) {
			if (this.type === "checkbox") {
				this.$emit("input", !this.model);
			} else if (this.type === "select") {
				this.$emit("input", Array.isArray(value) ? value.map(v => v.key) : [value.key]);
			} else {
				this.$emit("input", value);
			}
		},
		handleChange (e) {
			this.$emit("change", e);
		}
	}
}
</script>
<style lang="scss">
	@import "vue-multiselect/dist/vue-multiselect.min.css";

	.formInput {
		display: block;
		width: 100%;
		margin: math.div($gap, 2) 0;

		&--textarea {
			label {
				flex-wrap: wrap;
			}
		}

		label {
			display: flex;
			width: 100%;
			flex-direction: column;
		}

		.formInput__label {
			display: flex;
			width: 100%;
		}

		.formInput__field {
			width: 100%;
			max-width: 400px;
			border-bottom: 1px solid $grey;
			background: $grey-lighter;
			// overflow: hidden;

			input, select, textarea {
				width: 100%;
				max-width: 100%;
				background: none;
				border: none;
				margin: 0;
				padding: math.div($gap, 4);
				height: 26px;
			}

			textarea, select[multiple] {
				height: initial;
			}
		}

		&--select {
			.multiselect {
				min-height: 26px;
				height: 26px;
			}

			.multiselect__select {
				height: 26px;

				&:before {
					top: 80%;
				}
			}

			.multiselect__tags {
				background: $grey-lighter;
				border-radius: 0;
				min-height: 26px;
				padding: 3px 40px 0 8px
			}

			.multiselect__single {
				background: none;
				font-size: 1em;
				line-height: initial;
				min-height: initial;
				margin: 0;
			}

			.multiselect__content-wrapper {
				background: $grey-light;
			}

			.multiselect__placeholder {
				padding: 0;
				margin-bottom: 0;
			}

			.multiselect__option {
				padding: math.div($gap, 2) $gap;
				min-height: initial;

				&--highlight {
					background: $primary;
				}

				&:after {
					display: none;
				}
			}
		}
	}
</style>
