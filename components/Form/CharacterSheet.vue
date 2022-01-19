<template>
	<div class="characterSheet">
		<p>Character sheet</p>
		<FormFields :fields="sheetSkeleton" />
	</div>
</template>
<script>
import { sheetSkeleton } from "../../data/chardata";

export default {
	name: "CharacterSheet",
	props: {
		structure: {
			type: Object,
			default: () => ({})
		}
	},
	data: () => ({
		sheetSkeleton
	})
}
</script>
