<template>
	<div class="charactersPage">
		<h1>Characters</h1>
		<CommonTable
			:columns="characterColumns"
			:rows="parsedCharacters"
		/>
	</div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import * as clans from "@/data/details/clans";

export default {
	name: "CharactersPage",
	data: () => ({
		filter: {}
	}),
	computed: {
		...mapState({
			characters ({ characters: { characters = [] } }) {
				return characters;
			}
		}),
		parsedCharacters () {
			return (this.characters || []).reduce((acc, { id, sheet, image }) => ([
				...acc,
				{
					id,
					image: `/image/${id}`,
					characterName: sheet?.details?.info?.name,
					clan: sheet?.details?.vampire?.clan,
					generation: sheet?.details?.vampire?.generation
				}
			]), []);
		},
		characterColumns () {
			return {
				id: {
					label: "ID"
				},
				image: {
					label: "Avatar",
					parser (val, item, h) {
						return h("img", {
							attrs: {
								src: val,
								width: 100
							}
						});
					}
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
								component.$router.push(`/characters/${item.id}`);
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
			loadAll: "characters/loadAll"
		}),
		onLoad () {
			this.loadAll({ filter: this.filter });
		}
	}
}
</script>
