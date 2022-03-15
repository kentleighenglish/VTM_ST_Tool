<template>
	<div class="characterSheet">
		<h1>Character sheet</h1>
		<div class="characterSheet__fields">
			<FormFields :fields="sheetSkeleton" v-model="data" @input="updateForm" />
		</div>
		<div class="characterSheet__meta">
			META
		</div>
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
		display: grid;

		grid-template-rows: auto auto;
		grid-template-columns: 1fr 900px 1fr;
		grid-template-areas:
			". title ."
			". fields meta";
		// max-width: 900px;
		// margin: 0 auto;

		h1 {
			grid-area: title;
		}

		&__fields {
			grid-area: fields;
		}

		&__meta {
			grid-area: meta;
			padding: 0 $gap;
		}
	}
</style>
