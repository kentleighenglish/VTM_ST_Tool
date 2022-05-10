<template>
	<div class="characterSheet">
		<h1>Character sheet</h1>
		<div class="characterSheet__fields">
			<FormFields v-model="model" :fields="sheetData" @input="updateValue" />
		</div>
		<div class="characterSheet__actions">
			ACTIONS
		</div>
		<div class="characterSheet__meta">
			<div
				ref="metaContainer"
				class="characterSheet__metaInner"
				:style="{ maxHeight: `${metaSize.height}px` }"
				v-html="metaText"
			/>
		</div>
	</div>
</template>
<script>
import { mapState } from "vuex";
import { sheetSkeleton } from "../../data/chardata";

export default {
	name: "CharacterSheet",
	props: {
		value: {
			type: Object,
			default: () => ({})
		},
		readOnly: Boolean
	},
	data: () => ({
		sheetData: {},
		model: {},
		metaSize: {
			height: 1000
		}
	}),
	computed: {
		...mapState({
			metaText ({ sheets }) {
				return (sheets.metaDisplay.text || "").replaceAll(/[\n\r]/g, "<br>")
			}
		})
	},
	created () {
		this.model = this.value;
	},
	mounted () {
		this.model = this.value;

		this.updateSheetData();

		document.addEventListener("resize", () => this.calculateMetaSize());
		this.calculateMetaSize();
	},
	methods: {
		calculateMetaSize () {
			const docHeight = document.body.clientHeight;
			const el = this.$refs.metaContainer;

			if (el) {
				this.metaSize.height = docHeight - el.offsetTop - 40;
			}
		},
		updateValue (e, value) {
			this.$emit("input", {
				...(this.data || {}),
				...(value || {})
			});

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

					if (key === "params") {
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
	},
	watch: {
		value (v) {
			this.model = v;
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
			"actions fields meta";
		// max-width: 900px;
		// margin: 0 auto;

		h1 {
			grid-area: title;
		}

		&__fields {
			grid-area: fields;
		}

		&__meta {
			position: relative;
			grid-area: meta;
		}

		&__actions {
			position: relative;
			grid-area: actions;
		}

		&__metaInner {
			position: fixed;
			padding: $gap;
			overflow-x: auto;
		}
	}
</style>
