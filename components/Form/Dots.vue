<template>
	<div class="dotsInput">
		{{ label }}
	</div>
</template>
<script>
export default {
	name: "FormDots",
	props: {
		label: {
			type: String,
			default: null
		}
	}
}
</script>
