<template>
	<div class="formInput">
		Input
	</div>
</template>
<script>
export default {
	name: "FormInput",
	props: {
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
		}
	}
}
</script>
