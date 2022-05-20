<template>
	<div :class="className">
		<component
			:is="field.component"
			v-for="field in parsedFields"
			:key="field.data.name"
			v-bind="field.data"
			v-model="field.value"
			:original-value="field.originalValue"
			:create-mode="createMode"
			:admin-mode="adminMode"
			:xp-check="xpCheck"
			:xp-spend-update="xpSpendUpdate"
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
	section: "CharacterFormSection",
	sectionColumn: "CharacterFormSectionColumn",
	dots: "CharacterFormDots",
	statusDots: "CharacterFormStatusDots",
	dynamicField: "CharacterFormDynamicField",
	...inputTypes.reduce((acc, k) => ({ ...acc, [k]: "CharacterFormInput" }), {})
}

export default {
	name: "CharacterFormFields",
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
		},
		originalValue: {
			type: [Object, Number, String],
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
					originalValue: this.originalValue ? this.originalValue[key] : null,
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
