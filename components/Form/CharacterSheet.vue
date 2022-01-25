<template>
	<div class="characterSheet">
		<h1>Character sheet</h1>
		{{ JSON.stringify(data) }}
		<FormFields :fields="sheetSkeleton" v-model="data" @input="updateForm" />
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
		sheetSkeleton,
		data: {}
	}),
	methods: {
		updateForm (value) {
			this.data = {
				...(this.data || {}),
				...(value || {})
			};
		}
	}
}
</script>
<style lang="scss">
	.characterSheet {
		max-width: 900px;
		margin: 0 auto;
	}
</style>
