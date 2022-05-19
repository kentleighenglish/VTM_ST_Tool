<template>
	<div class="characterView">
		<CharacterTabs :tabs="tabs" default-tab="sheet">
			<template #sheet>
				<CharacterSheet
					v-model="formData"
					:create-mode="createModeParsed"
					:xp-check="xpCheck"
					:xp-spend-update="xpSpendUpdate"
				/>
			</template>
			<template #powers>
				<CharacterPowers :data="formData.sheet" />
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
		characterId: null,
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
			adminMode ({ adminMode }) {
				return !!adminMode;
			},
			metaText ({ characters }) {
				return (characters.metaDisplay.text || "").replaceAll(/[\n\r]/g, "<br>");
			},
			loading ({ characters: { loading } }) {
				return !!loading;
			},
			loadedCharacter ({ characters: { currentCharacter = {} } }) {
				return { ...currentCharacter };
			}
		}),
		createModeParsed () {
			return (!this.characterId || this.createMode) || !this.adminMode;
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

			if (this.adminMode) {
				tabs.unshift({
					key: "rewardXp",
					label: "Reward 1 XP",
					action: () => this.onGiveXp(1),
					state: "primary"
				});
			}

			if (this.formData?.sheet?.details?.vampire?.clan) {
				tabs.push({
					key: "powers",
					label: "Powers"
				});
			}

			return tabs;
		}
	},
	watch: {
		loadedCharacter () {
			this.formData = { ...this.loadedCharacter };
		}
	},
	mounted () {
		this.characterId = this.$route.params.id;

		if (!this.createMode && this.characterId) {
			this.loadCharacter({ id: this.characterId });
			this.joinRoom({ id: this.characterId });
		}
	},
	beforeDestroy () {
		if (this.characterId) {
			this.leaveRoom({ id: this.characterId })
		}
	},
	methods: {
		...mapActions({
			createCharacter: "characters/create",
			updateCharacter: "characters/update",
			loadCharacter: "characters/load",
			rewardXp: "characters/rewardXp",
			joinRoom: "socket/joinRoom",
			leaveRoom: "socket/leaveRoom"
		}),
		reset () {
			this.formData = { ...(this.loadedCharacter || {}) };
		},
		xpCheck (cost) {
			return (this.formData?.xp?.avalablePoints || 0) >= cost;
		},
		xpSpendUpdate (fieldName, cost) {

		},
		async onSaveCharacter () {
			if (!this.createMode && this.characterId) {
				await this.updateCharacter({ _id: this.characterId, ...this.formData });
			} else {
				const { id } = await this.createCharacter({ ...this.formData });

				this.$router.replace(`/characters/${id}`);
			}
		},
		async onGiveXp (amount) {
			await this.rewardXp({ id: this.characterId, amount });
		}
	}
}
</script>
<style lang="scss">
.characterView {

}
</style>
