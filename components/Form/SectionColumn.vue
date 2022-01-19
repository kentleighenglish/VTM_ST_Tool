<template>
	<div class="formSectionColumn">
		<h4 v-if="label" class="formSectionColumn__title">{{ label }}</h4>
		<FormFields v-if="fields" :fields="fields" className="formSectionColumn__content" />
	</div>
</template>
<script>
export default {
	name: "FormSection",
	props: {
		name: {
			type: String,
			default: null
		},
		label: {
			type: String,
			default: null
		},
		fields: {
			type: Object,
			default: () => ({})
		},
		onChange: {
			type: Function,
			default: () => {}
		}
	},
	methods: {
		handleChange: () => {

		}
	}
}
</script>
<style lang="scss">
	.formSectionColumn {
		padding: 0 $gap;
	}
</style>
