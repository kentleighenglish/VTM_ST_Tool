<template>
	<div class="characterActions">
		{{ data }}
	</div>
</template>
<script>

export default {
	name: "SheetActions",
	props: {
		data: {
			type: Object,
			default: () => ({})
		}
	}
}
</script>
<style lang="scss">
.characterActions {
	padding: $gap * 2 $gap;
}
</style>
