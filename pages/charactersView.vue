<template>
	<div class="characterView">
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
		</CharacterTabs>
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
		modifiedData: {}
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
				return !!loading;
			},
			loadedCharacter ({ characters: { currentCharacter = {} } }) {
				return { ...currentCharacter };
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
					key: "removeXp",
					label: "-1 XP",
					action: () => this.onRemoveXp(1),
					state: "danger"
				});
				tabs.unshift({
					key: "rewardXp",
					label: "+1 XP",
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
			removeXp: "characters/removeXp",
			joinRoom: "socket/joinRoom",
			leaveRoom: "socket/leaveRoom"
		}),
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
