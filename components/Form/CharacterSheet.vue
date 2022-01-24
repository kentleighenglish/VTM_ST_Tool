<template>
	<div class="characterSheet">
		<p>Character sheet</p>
		{{ JSON.stringify(data) }}
		<FormFields :fields="sheetSkeleton" :value="data" @input="updateForm" />
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
		updateForm ({ name, value }) {
			this.data = {
				...this.data,
				[name]: value
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
