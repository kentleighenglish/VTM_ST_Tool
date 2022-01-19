<template>
	<div class="formSection">
		<h3 v-if="label" class="formSection__title">
			{{ label }}
		</h3>
		<FormFields v-if="fields" :fields="fields" className="formSection__content" />
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
	.formSection {
		display: flex;
		flex-direction: column;

		&__title {
			text-align: center;
		}

		&__content {
			display: grid;
			grid-template-areas: ". . .";
		}
	}
</style>
