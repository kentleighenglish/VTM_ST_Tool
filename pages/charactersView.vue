<template>
	<div class="characterView">
		<CharacterTabs :tabs="tabs" default-tab="sheet">
			<template #sheet>
				<CharacterSheet v-model="formData" :read-only="readOnly" />
			</template>
			<template #powers>
				<CharacterPowers :data="formData" />
			</template>
		</CharacterTabs>
	</div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
	name: "CharactersViewPage",
	props: {
		createMode: Boolean
	},
	data: () => ({
		sheetId: null,
		formData: {}
	}),
	head () {
		const charName = this.loadedCharacter?.details?.info?.name;
		const createMode = this.createMode;

		return {
			title: createMode ? "New Character" : charName
		}
	},
	computed: {
		...mapState({
			metaText ({ characters }) {
				return (characters.metaDisplay.text || "").replaceAll(/[\n\r]/g, "<br>");
			},
			loading ({ sheets: { loading } }) {
				return !!loading;
			},
			loadedSheet ({ characters: { currentCharacter = null } }) {
				return currentCharacter;
			}
		}),
		readOnly () {
			return !!this.sheetId
		},
		tabs () {
			const tabs = [
				{
					key: "saveCharacter",
					label: this.createMode ? "Create Character" : "Save Character",
					action: () => this.onSaveCharacter(),
					state: "primary"
				},
				{
					key: "resetCharacter",
					label: "Reset",
					action: () => this.reset(),
					state: "warning"
				},
				{
					key: "sheet",
					label: "Character Sheet"
				}
			];

			if (this.formData?.details?.vampire?.clan) {
				tabs.push({
					key: "powers",
					label: "Powers"
				});
			}

			return tabs;
		}
	},
	watch: {
		loadedSheet () {
			this.formData = this.loadedSheet;
		}
	},
	mounted () {
		this.characterId = this.$route.params.id;

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
			createCharacter: "characters/create",
			updateCharacter: "characters/update",
			loadSheet: "characters/load",
			joinRoom: "socket/joinRoom",
			leaveRoom: "socket/leaveRoom"
		}),
		onUpdate (data) {
			this.formData = data;
		},
		reset () {
			this.formData = { ...(this.loadedCharacter || {}) };
		},
		async onSaveCharacter () {
			if (!this.createMode && this.characterId) {
				await this.updateCharacter({ _id: this.characterId, sheet: this.formData });
			} else {
				const { id } = await this.createCharacter({ sheet: this.formData });

				this.$router.replace(`/characters/${id}`);
			}
		}
	}
}
</script>
<style lang="scss">
.characterView {

}
</style>
