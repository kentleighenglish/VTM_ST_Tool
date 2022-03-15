<template>
	<div class="characterSheet">
		<h1>Character sheet</h1>
		<div class="characterSheet__fields">
			<FormFields v-model="data" :fields="sheetData" @input="updateForm" />
		</div>
		<div class="characterSheet__meta">
			{{ metaText }}
		</div>
	</div>
</template>
<script>
import { mapState } from "vuex";
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
		sheetData: {},
		data: {}
	}),
	computed: {
		...mapState({
			metaText ({ sheets }) {
				return sheets.metaDisplay.text
			}
		})
	},
	mounted () {
		this.updateSheetData();
	},
	methods: {
		updateForm (value) {
			this.data = {
				...(this.data || {}),
				...(value || {})
			};

			this.updateSheetData();
		},
		updateSheetData () {
			const updateParams = (params) => {
				return Object.keys(params).reduce((acc, key) => ({
					...acc,
					[key]: params[key](this.data)
				}), {});
			}

			const parseObject = (obj) => {
				return Object.keys(obj).reduce((acc, key) => {
					const prop = obj[key];

					if (
						(typeof prop !== "object" || Array.isArray(prop)) ||
						(typeof prop === "object" && !prop)
					) {
						return {
							...acc,
							[key]: prop
						}
					}

					if (key === "_params") {
						return {
							...acc,
							[key]: updateParams(prop)
						};
					} else {
						return {
							...acc,
							[key]: parseObject(prop)
						};
					}
				}, {});
			}

			this.sheetData = parseObject(sheetSkeleton);
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
