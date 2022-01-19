<template>
	<div class="form__section">
		<p>Section</p>
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
