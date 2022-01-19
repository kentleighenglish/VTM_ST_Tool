<template>
	<LayoutDefault>
		<FormCharacterSheet :data="formData" />
	</LayoutDefault>
</template>
<script>

export default {
	name: "SheetsPage",
	data: () => ({
		formData: {}
	})
}
</script>
