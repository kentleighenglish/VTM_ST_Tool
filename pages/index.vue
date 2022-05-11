<template>
	<LayoutDefault>
		<h1>Characters</h1>
		<CommonTable
			:columns="characterSheetColumns"
			:rows="parsedSheets"
		/>
	</LayoutDefault>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
	name: "IndexPage",
	data: () => ({
		filter: {}
	}),
	computed: {
		...mapState({
			sheets ({ sheets: { sheets = [] } }) {
				return sheets;
			}
		}),
		parsedSheets () {
			return (this.sheets || []).reduce((acc, { _id, sheet }) => ([
				...acc,
				{
					id: _id,
					characterName: sheet?.details?.info?.name,
					clan: sheet?.details?.vampire?.clan
				}
			]), []);
		},
		characterSheetColumns () {
			return {
				id: {
					label: "ID"
				},
				characterName: {
					label: "Character Name"
				},
				actions: {
					label: "",
					key: null,
					actions: () => ([
						{
							label: "View",
							func (item, component) {
								component.$router.push(`/sheets/${item.id}`);
							}
						}
					])
				}
			};
		}
	},
	mounted () {
		this.onLoad();
	},
	methods: {
		...mapActions({
			loadAll: "sheets/loadAll"
		}),
		onLoad () {
			this.loadAll({ filter: this.filter });
		}
	}
}
</script>
