<template>
	<component :is="fieldComponent" v-bind="data" />
</template>
<script>
import Section from "./Section";
// import SectionColumn from "./SectionColumn"
// import Input from "./Input"

const types = {
	section: Section
	// sectionColumn: SectionColumn,
	// text: Input,
	// select: Input,
	// checkbox: Input,
	// password: Input,
	// date: Input,
	// radio: Input,
	// number: Input
}

export default {
	name: "FormField",
	props: {
		type: {
			type: String,
			default: null
		}
	},
	computed: {
		fieldComponent () {
			if (types[this.type]) {
				return types[this.type];
			}
			return null;
		},
		data () {
			return this?.$vnode?.data?.attrs | {};
		}
	}
}
</script>
