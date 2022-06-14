import Vue from "vue";

export const loadType = "@characters/load";
export const loadCompleteType = "@characters/loadComplete";
export const loadAllType = "@characters/loadAll";
export const loadAllCompleteType = "@characters/loadAllComplete";

export default {
	[loadType] (state, { id }) {
		Vue.set(state.loading, id, true);
	},
	[loadCompleteType] (state, { character, id }) {
		Vue.set(state, "currentCharacter", character);
		Vue.set(state, "currentCharacterId", character.id);

		const characters = [...state.characters];
		const index = characters.findIndex(c => c.id === character.id);

		if (index === -1) {
			characters.push(character);
		} else {
			characters[index] = character;
		}

		Vue.set(state, "characters", characters);
		Vue.set(state.loading, id, false);
	},
	[loadAllType] (state) {
		Vue.set(state.loading, "all", true);
	},
	[loadAllCompleteType] (state, { characters = [] }) {
		Vue.set(state, "characters", characters);
	}
}
