<template>
	<div class="sheetView">
		<SheetTabs :tabs="tabs" default-tab="main">
			<template #main>
				<SheetMain v-model="formData" :read-only="readOnly" />
			</template>
		</SheetTabs>
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
		formData: {},
		tabs: {
			main: {
				label: "Main"
			}
		}
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

}
</style>
