<template>
	<div class="formFields">
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
import Input from "./Input"

const types = {
	section: Section,
	sectionColumn: SectionColumn,
	text: Input,
	select: Input,
	checkbox: Input,
	password: Input,
	date: Input,
	radio: Input,
	number: Input
}

export default {
	name: "FormFields",
	props: {
		fields: {
			type: Object,
			default: () => ({})
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
