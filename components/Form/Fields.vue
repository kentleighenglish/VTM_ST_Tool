<template>
	<div :class="className">
		<component
			:is="field.component"
			v-for="field in parsedFields"
			:key="field.data.name"
			v-bind="field.data"
		/>
	</div>
</template>
<script>
import Section from "./Section";
import SectionColumn from "./SectionColumn"
import Dots from "./Dots"
import Input from "./Input"

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
	section: Section,
	sectionColumn: SectionColumn,
	dots: Dots,
	...inputTypes.reduce((acc, k) => ({ ...acc, [k]: Input }), {})
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
		}
	},
	computed: {
		parsedFields () {
			return Object.keys(this.fields)
				.filter(key => types[this.fields[key].type])
				.map(key => ({
					component: types[this.fields[key].type],
					data: {
						name: key,
						...this.fields[key]
					}
				}));
		}
	}
}
</script>
