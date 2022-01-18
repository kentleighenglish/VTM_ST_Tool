<template>
	<LayoutDefault>
		<FormCharacterSheet :structure="sheetSkeleton" />
	</LayoutDefault>
</template>
<script>
import { sheetSkeleton } from "../data/chardata"

export default {
	name: "SheetsPage",
	data: () => ({
		sheetSkeleton
	})
}
</script>
