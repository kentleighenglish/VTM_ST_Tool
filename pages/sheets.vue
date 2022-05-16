<template>
	<div class="sheetsPage">
		<h1>Characters</h1>
		<CommonTable
			:columns="characterSheetColumns"
			:rows="parsedSheets"
		/>
	</div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import * as clans from "@/data/details/clans";

export default {
	name: "SheetsPage",
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
					clan: sheet?.details?.vampire?.clan,
					generation: sheet?.details?.vampire?.generation
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
				clan: {
					label: "Clan",
					parser: val => val ? clans[val].label : null
				},
				generation: {
					label: "Generation",
					parser: (val) => {
						if (!val) { return null; }
						const lastNum = `${val}`.substr(-1);
						switch (lastNum) {
						case "1":
							return `${val}st`;
						case "2":
							return `${val}nd`;
						default:
							return `${val}th`;
						}
					}
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
