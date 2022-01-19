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
<style lang="scss">
	.characterSheet {
		max-width: 900px;
		margin: 0 auto;
	}
</style>
