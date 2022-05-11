<template>
	<LayoutDefault>
		<div class="sheets">
			<h1 class="sheets__title">
				Character sheet
			</h1>
			<div class="sheets__fields">
				<FormCharacterSheet v-model="formData" :read-only="readOnly" @input="onUpdate" />
			</div>
			<div class="sheets__actions">
				<CommonButton @click="onSaveSheet">
					Save Sheet
				</CommonButton>
			</div>
			<div class="sheets__meta">
				<div
					ref="metaContainer"
					class="sheets__metaInner"
					:style="{ maxHeight: `${metaSize.height}px` }"
					v-html="metaText"
				/>
			</div>
		</div>
	</LayoutDefault>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
	name: "SheetsPage",
	data: () => ({
		sheetId: null,
		formData: {},
		metaSize: {
			height: 1000
		}
	}),
	computed: {
		...mapState({
			metaText ({ sheets }) {
				return (sheets.metaDisplay.text || "").replaceAll(/[\n\r]/g, "<br>");
			},
			loading ({ sheets: { loading } }) {
				return !!loading;
			},
			loadedSheet ({ sheets: { currentSheet = null } }) {
				return currentSheet;
			}
		}),
		readOnly () {
			return !!this.sheetId
		}
	},
	watch: {
		loadedSheet () {
			this.formData = this.loadedSheet;
		}
	},
	mounted () {
		this.sheetId = this.$route.params.id;

		if (this.sheetId) {
			this.loadSheet({ id: this.sheetId });
		}

		document.addEventListener("resize", () => this.calculateMetaSize());
		this.calculateMetaSize();
	},
	methods: {
		...mapActions({
			createSheet: "sheets/create",
			loadSheet: "sheets/load"
		}),
		calculateMetaSize () {
			const docHeight = document.body.clientHeight;
			const el = this.$refs.metaContainer;

			if (el) {
				this.metaSize.height = docHeight - el.offsetTop - 40;
			}
		},
		onUpdate (data) {
			this.formData = data;
		},
		async onSaveSheet () {
			if (this.sheetId) {
				// @todo load sheet placeholder
			} else {
				const { id } = await this.createSheet({ sheet: this.formData });

				this.$router.push(`/sheets/${id}`);
			}
		}
	}
}
</script>
<style lang="scss">
.sheets {
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
