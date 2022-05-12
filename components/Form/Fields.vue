<template>
	<div :class="className">
		<component
			:is="field.component"
			v-for="field in parsedFields"
			:key="field.data.name"
			v-bind="field.data"
			v-model="field.value"
			@input="handleChange(field.data.name, $event)"
		/>
	</div>
</template>
<script>

const inputTypes = [
	"text",
	"select",
	"checkbox",
	"password",
	"date",
	"radio",
	"number"
];

const types = {
	section: "FormSection",
	sectionColumn: "FormSectionColumn",
	dots: "FormDots",
	dynamicField: "FormDynamicField",
	...inputTypes.reduce((acc, k) => ({ ...acc, [k]: "FormInput" }), {})
}

export default {
	name: "FormFields",
	props: {
		fields: {
			type: Object,
			default: () => ({})
		},
		className: {
			type: String,
			default: "formFields"
		},
		onChange: {
			type: Function,
			default: () => {}
		},
		value: {
			type: [Object, Number, String],
			default: null
		}
	},
	data: () => ({
		model: {}
	}),
	computed: {
		parsedFields () {
			return Object.keys(this.fields)
				.filter(key => types[this.fields[key].type])
				.map(key => ({
					component: types[this.fields[key].type],
					value: this.model ? this.model[key] : null,
					data: {
						name: key,
						...this.fields[key]
					}
				}));
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
		handleChange (name, value) {
			this.$emit("input", {
				...(this.model || {}),
				[name]: value
			});
		}
	}
}
</script>
