<template>
	<div class="sheetView">
		<h1 class="sheetView__title">
			Character sheet
		</h1>
		<div class="sheetView__fields">
			<SheetCharacterSheet v-model="formData" :read-only="readOnly" @input="onUpdate" />
		</div>
		<div class="sheetView__actions">
			<CommonSticky :offset-top="40">
				<CommonButton @click="onSaveSheet">
					{{ sheetId ? "Save Sheet" : "Create Sheet" }}
				</CommonButton>
				<CommonButton @click="reset">
					Reset
				</CommonButton>
			</CommonSticky>
		</div>
		<div class="sheetView__meta">
			<CommonSticky :offset-top="40">
				<div
					ref="metaContainer"
					class="sheetView__metaInner"
					v-html="metaText"
				/>
			</CommonSticky>
		</div>
	</div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
	name: "SheetsPage",
	props: {
		createMode: Boolean
	},
	data: () => ({
		sheetId: null,
		formData: {}
	}),
	head () {
		const charName = this.loadedSheet?.details?.info?.name;
		const createMode = this.createMode;

		return {
			title: createMode ? "New Sheet" : charName
		}
	},
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

		if (!this.createMode && this.sheetId) {
			this.loadSheet({ id: this.sheetId });
			this.joinRoom({ id: this.sheetId });
		}
	},
	beforeDestroy () {
		if (this.sheetId) {
			this.leaveRoom({ id: this.sheetId })
		}
	},
	methods: {
		...mapActions({
			createSheet: "sheets/create",
			updateSheet: "sheets/update",
			loadSheet: "sheets/load",
			joinRoom: "socket/joinRoom",
			leaveRoom: "socket/leaveRoom"
		}),
		onUpdate (data) {
			this.formData = data;
		},
		reset () {
			this.formData = this.loadedSheet;
		},
		async onSaveSheet () {
			if (!this.createMode && this.sheetId) {
				await this.updateSheet({ _id: this.sheetId, sheet: this.formData });
			} else {
				const { id } = await this.createSheet({ sheet: this.formData });

				this.$router.replace(`/sheets/${id}`);
			}
		}
	}
}
</script>
<style lang="scss">
.sheetView {
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
		padding: $gap;
		overflow-x: auto;
	}
}
</style>
