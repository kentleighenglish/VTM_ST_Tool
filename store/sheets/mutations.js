import Vue from "vue";

export const updateMetaFieldType = "@sheets/updateMetaField";
export const loadSheetType = "@sheets/loadSheet";
export const loadSheetCompleteType = "@sheets/loadSheetComplete";

export default {
	[updateMetaFieldType] (state, { text }) {
		Vue.set(state.metaDisplay, "text", text);
	},
	[loadSheetType] (state, { id }) {
		Vue.set(state, "loading", true);
	},
	[loadSheetCompleteType] (state, { sheet }) {
		Vue.set(state, "currentSheet", sheet.sheet);
		Vue.set(state, "currentSheetId", sheet._id);
		Vue.set(state, "loading", false);
	}
}
