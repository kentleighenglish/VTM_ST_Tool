<template>
	<div class="formSectionColumn">
		<h4 v-if="label" class="formSectionColumn__title">
			{{ label }}
		</h4>
		<FormFields
			v-if="fields"
			v-model="model"
			:fields="fields"
			class-name="formSectionColumn__content"
			@input="handleChange"
		/>
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
		value: {
			type: Object,
			default: () => ({})
		}
	},
	data: () => ({
		model: null
	}),
	methods: {
		handleChange ({ name, value }) {
			this.model = {
				...(this.value || {}),
				[name]: value
			}

			this.$emit("input", this.model);
		}
	}
}
</script>
<style lang="scss">
	.formSectionColumn {
		padding: 0 $gap;
	}
</style>
