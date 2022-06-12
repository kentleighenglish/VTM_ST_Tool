<template>
	<CommonLoading v-if="loading" />
	<div v-else class="characterView" @click.middle="resetMetaDisplayLock($event)">
		<CharacterTabs :tabs="tabs" default-tab="sheet">
			<template #sheet>
				<CharacterSheet
					v-model="formData"
					:original-value="loadedCharacter"
					:create-mode="createModeParsed"
					:admin-mode="adminMode"
					:xp-check="xpCheck"
					:xp-spend-update="xpSpendUpdate"
					:xp-spend-reset="xpSpendReset"
				/>
			</template>
			<template #powers>
				<CharacterPowers :data="formData.sheet" />
			</template>
			<template #actions>
				<CharacterActions :character-id="characterId" :data="formData.sheet" />
			</template>
		</CharacterTabs>
		<CommonModal name="uploadAvatarModal" :confirm="onUploadAvatar" confirm-label="Upload">
			<img :src="avatar.preview" />
			<FormInput type="file" accept="image/*" @change="addAvatarImage" disable-meta-display />
		</CommonModal>
	</div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { uniqBy, set } from "lodash";

const flattenObject = (object, path = []) => {
	const parseProp = (prop, path) => {
		if (typeof prop === "object" && !Array.isArray(prop)) {
			return Object.keys(prop).reduce((acc, key) => ({
				...acc,
				...parseProp(prop[key], [...path, key])
			}), {});
		} else if (Array.isArray(prop)) {
			const key = path.pop();
			return {
				...prop.reduce((acc, arrVal, index) => ({
					...acc,
					...parseProp(arrVal, [...path, `${key}[${index}]`])
				}), {})
			}
		} else {
			return {
				[path.join(".")]: prop
			}
		}
	}

	return parseProp(object, []);
}

export default {
	name: "CharactersViewPage",
	props: {
		createMode: Boolean
	},
	data: () => ({
		characterId: null,
		formData: {},
		modifiedData: {},
		avatar: {}
	}),
	head () {
		const charName = this.loadedCharacter?.sheet?.details?.info?.name;
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
				return !!loading[this.characterId];
			},
			loadedCharacter ({ characters: { currentCharacter = {} } }) {
				return { ...currentCharacter };
			},
			metaDisplayLocked ({ metaDisplayLocked }) {
				return metaDisplayLocked;
			}
		}),
		createModeParsed () {
			return (!this.characterId || this.createMode);
		},
		tabs () {
			const tabs = [
				{
					key: "saveCharacter",
					label: this.createMode ? "Create Character" : "Save Character",
					action: () => this.onSaveCharacter(),
					state: "primary",
					weight: 2
				},
				{
					key: "resetCharacter",
					label: "Reset",
					action: () => this.reset(),
					state: "warning",
					weight: 3
				},
				{
					key: "sheet",
					label: "Character Sheet",
					weight: 4
				},
				{
					key: "actions",
					label: "Actions",
					weight: 6
				}
			];

			if (this.adminMode) {
				tabs.push({
					key: "removeXp",
					label: "-1 XP",
					action: () => this.onRemoveXp(1),
					state: "special",
					weight: -2
				});
				tabs.push({
					key: "rewardXp",
					label: "+1 XP",
					action: () => this.onGiveXp(1),
					state: "special",
					weight: -3
				});
				tabs.push({
					key: "uploadAvatar",
					label: "Upload Avatar",
					action: () => this.openUploadAvatarModal(),
					state: "special",
					weight: -1
				})
			}

			if (this.formData?.sheet?.details?.vampire?.clan) {
				tabs.push({
					key: "powers",
					label: "Powers",
					weight: 5
				});
			}

			return tabs.sort((a, b) => a.weight > b.weight ? 1 : -1);
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
			this.loadSession();
		}
	},
	beforeDestroy () {
		if (this.characterId) {
			this.leaveRoom({ id: this.characterId })
		}
	},
	methods: {
		...mapActions({
			setMetaDisplayLock: "setMetaDisplayLock",
			createCharacter: "characters/create",
			updateCharacter: "characters/update",
			loadCharacter: "characters/load",
			loadSession: "session/fetchSession",
			rewardXp: "characters/rewardXp",
			removeXp: "characters/removeXp",
			uploadAvatar: "characters/uploadAvatar",
			joinRoom: "socket/joinRoom",
			leaveRoom: "socket/leaveRoom",
			openModal: "openModal"
		}),
		openUploadAvatarModal () {
			this.openModal("uploadAvatarModal");
		},
		addAvatarImage ($event) {
			const file = $event.target.files[0];

			this.avatar = {
				preview: URL.createObjectURL(file),
				file
			};
		},
		onUploadAvatar () {
			if (this.avatar.file) {
				const reader = new FileReader();

				reader.onload = () => {
					const bytes = new Uint8Array(reader.result);
					this.uploadAvatar({ id: this.characterId, image: bytes });
				};
				reader.readAsArrayBuffer(this.avatar.file);
			}
		},
		resetMetaDisplayLock ($event) {
			if (this.metaDisplayLocked) {
				$event.preventDefault();
				this.setMetaDisplayLock(false);
			}
		},
		reset () {
			this.formData = { ...(this.loadedCharacter || {}) };
			this.modifiedData = {};
		},
		xpCheck (cost) {
			if (this.adminMode) {
				return true;
			}

			return (this.formData?.xp?.availablePoints || 0) >= cost;
		},
		xpSpendUpdate (name, label, value, cost) {
			const xp = (this.formData?.xp?.availablePoints || 0);
			const history = [...(this.formData?.xp?.history || [])];

			const date = new Date();
			const updatedXp = this.adminMode ? xp : (xp - cost);

			history.push({
				name,
				label,
				value,
				cost: this.adminMode ? 0 : cost,
				date,
				admin: !!this.adminMode
			});

			this.formData.xp = {
				...this.formData.xp,
				availablePoints: updatedXp,
				history
			}
		},
		xpSpendReset (name) {
			const xp = (this.formData?.xp?.availablePoints || 0);
			const history = [...(this.formData?.xp?.history || [])].filter(
				item => !(this.loadedCharacter?.xp?.history || []).includes(item)
			);

			let updatedXp = xp;

			const newHistory = [...history].reduce((acc, item) => {
				if (item.name === name) {
					updatedXp += item.cost;
				} else {
					acc.push(item);
				}
				return acc;
			}, []);

			this.formData.xp = {
				...this.formData.xp,
				availablePoints: updatedXp,
				history: uniqBy([
					...newHistory,
					...(this.loadedCharacter?.xp?.history || [])
				], "date")
			}
		},
		async onSaveCharacter () {
			if (!this.createMode && this.characterId) {
				const existingSheet = flattenObject(this.loadedCharacter.sheet);
				const updatedSheet = flattenObject(this.formData.sheet);
				const payloadSheet = {};

				Object.keys(updatedSheet).forEach((key) => {
					const value = updatedSheet[key];

					if (existingSheet[key] === undefined || (existingSheet[key] !== undefined && existingSheet[key] !== value)) {
						set(payloadSheet, key, value);
					}
				});

				await this.updateCharacter({ id: this.characterId, sheet: payloadSheet, xp: this.formData.xp });
			} else {
				const { id } = await this.createCharacter({ ...this.formData });

				this.$router.replace(`/characters/${id}`);
			}
		},
		async onGiveXp (amount) {
			await this.rewardXp({ id: this.characterId, amount });
		},
		async onRemoveXp (amount) {
			await this.removeXp({ id: this.characterId, amount });
		}
	}
}
</script>
<style lang="scss">
.characterView {

}
</style>
