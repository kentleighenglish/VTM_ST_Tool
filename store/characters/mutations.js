import Vue from "vue";

export const updateMetaFieldType = "@characters/updateMetaField";
export const loadType = "@characters/load";
export const loadCompleteType = "@characters/loadComplete";
export const loadAllType = "@characters/loadAll";
export const loadAllCompleteType = "@characters/loadAllComplete";

export default {
	[updateMetaFieldType] (state, { text }) {
		Vue.set(state.metaDisplay, "text", text);
	},
	[loadType] (state, { id }) {
		Vue.set(state.loading, id, true);
	},
	[loadCompleteType] (state, { character, id }) {
		Vue.set(state, "currentCharacter", character);
		Vue.set(state, "currentCharacterId", character._id);
		Vue.set(state.loading, id, false);
	},
	[loadAllType] (state) {
		Vue.set(state.loading, "all", true);
	},
	[loadAllCompleteType] (state, { characters = [] }) {
		Vue.set(state, "characters", characters);
	}
}
