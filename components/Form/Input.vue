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
					<select
						v-if="type === 'select'"
						v-model="model"
						:disabled="isDisabled"
						:multiple="!!multiple"
						@input="updateValue($event.target.value)"
						@change="handleChange($event)"
					>
						<option v-for="o in parsedOptions" :key="o.key" :value="o.key">{{ o.label }}</option>
					</select>
				</div>
			</label>
		</div>
	</FormRootModel>
</template>
<script>
import classModsMixin from "@/mixins/classModsMixin";

export default {
	name: "FormInput",
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
		value: {
			type: [Number, String, Array],
			default: null
		},
		originalValue: {
			type: [Number, String, Array],
			default: null
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
			return this.disabled || canEdit === undefined ? false : !canEdit;
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
			overflow: hidden;

			input, select, textarea {
				width: 100%;
				max-width: 100%;
				background: none;
				border: none;
				margin: 0;
				padding: math.div($gap, 4);
				height: 26px;
			}

			textarea {
				height: initial;
			}
		}
	}
</style>
