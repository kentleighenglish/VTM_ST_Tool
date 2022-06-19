<template>
	<CharacterSheet
		v-model="form"
		:create-mode="true"
		:skeleton="currentSkeleton"
		:xp-disabled="true"
	>
		<template #title>
			Create Character
		</template>
	</CharacterSheet>
</template>
<script>
import { sheetSkeleton } from "@/data/chardata";

export default {
	name: "CharacterCreatePage",
	data: () => ({
		form: {},
		currentStage: null,
		stages: [
			"details",
			"attributes",
			"abilities",
			"advantages"
		]
	}),
	mounted () {
		this.currentStage = "details";
	},
	computed: {
		currentSkeleton () {
			console.log(sheetSkeleton);
			return {};
		}
	}
}
</script>
