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
						:placeholder="placeholder"
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
						:value="model"
						:disabled="disabled"
						:multiple="!!multiple"
						:options="parsedOptions"
						:searchable="searchable"
						:close-on-select="true"
						:clear-on-select="true"
						:placeholder="placeholder"
						track-by="key"
						label="label"
						@input="updateValue"
						@remove="removeOption"
					>
						<template #tags="{ option }">
							<span class="multiselect__tag">{{ option.label }}</span>
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
	components: {
		Multiselect
	},
	mixins: [classModsMixin],
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
		searchable: {
			type: Boolean,
			default: false
		},
		placeholder: {
			type: String,
			default: undefined
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
		}
	},
	watch: {
		value (v) {
			this.model = this.parseValue(v);
		},
		parsedOptions (newOpts) {
			if (this.model && this.model.length) {
				this.updateValue(this.model.filter((key) => {
					return newOpts.find(opt => opt.key === key);
				}));
			}
		}
	},
	created () {
		this.model = this.parseValue(this.value);
	},
	mounted () {
		this.model = this.parseValue(this.value);
	},
	methods: {
		updateValue (value) {
			if (this.type === "checkbox") {
				this.$emit("input", !this.model);
			} else if (this.type === "select") {
				let parsedModel = Array.isArray(value) ? value : [value];
				parsedModel = parsedModel.filter(v => !!v).map(v => v.key);
				this.$emit("input", parsedModel);
			} else {
				this.$emit("input", value);
			}
		},
		removeOption (option) {
			this.model = this.model.filter((opt) => {
				return opt.key !== option.key
			});
			this.$emit("input", this.model);
		},
		handleChange (e) {
			this.$emit("change", e);
		},
		parseValue (value) {
			if (this.type === "select" && value) {
				const out = Array.isArray(value) ? value : [value];

				return out.map(v => this.parsedOptions.find(opt => opt.key === v));
			}

			return value;
		}
	}
}
</script>
<style lang="scss">
	@import "vue-multiselect/dist/vue-multiselect.min.css";
	$inputHeight: 26px;

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
				padding: math.div($gap, 4) math.div($gap, 2);
				height: $inputHeight;
				font-size: $font-size-sm;
				font-family: $font-family-default;
				color: $grey-darker;
			}

			textarea, select[multiple] {
				height: initial;
			}
		}

		&--select {
			.multiselect {
				min-height: $inputHeight;
				height: $inputHeight;
			}

			.multiselect__select {
				height: $inputHeight;

				&:before {
					top: 80%;
				}
			}

			.multiselect__tags {
				background: $grey-lighter;
				border-radius: 0;
				min-height: $inputHeight;
				height: $inputHeight;
				padding: math.div($gap, 4) math.div($gap, 2);
				font-size: 1em;
				color: $grey-darker;

				input {
					margin-top: -4px;
				}
			}

			.multiselect__single {
				background: none;
				font-size: $font-size-sm;
				line-height: initial;
				min-height: initial;
				margin: 0;
			}

			.multiselect__content-wrapper {
				background: lighten($grey-lighter, 5%);
			}

			.multiselect__placeholder {
				padding: 0;
				margin: 0;
				vertical-align: top;
				font-size: $font-size-sm;
				color: $grey-darker;
			}

			.multiselect__option {
				padding: math.div($gap, 2) math.div($gap, 2);
				min-height: initial;
				font-size: $font-size-sm;

				&--highlight {
					background: $primary;
				}

				&--selected {
					background: $grey-lighter;
					color: $grey-darker;

					&:hover {
						color: $grey-lightest;
						background: $primary;
					}
				}

				&:after {
					display: none;
				}
			}

			.multiselect__tag {
				font-size: $font-size-sm;
				border-radius: 0;
				background: $grey-light;
				color: $grey-darker;
				margin-top: -2px;
			}
		}
	}
</style>
