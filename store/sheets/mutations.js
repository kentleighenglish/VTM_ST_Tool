import Vue from "vue";

export const updateMetaFieldType = "@sheets/updateMetaField";
export const loadType = "@sheets/load";
export const loadCompleteType = "@sheets/loadComplete";
export const loadAllType = "@sheets/loadAll";
export const loadAllCompleteType = "@sheets/loadAllComplete";

export default {
	[updateMetaFieldType] (state, { text }) {
		Vue.set(state.metaDisplay, "text", text);
	},
	[loadType] (state, { id }) {
		Vue.set(state.loading, id, true);
	},
	[loadCompleteType] (state, { sheet, id }) {
		Vue.set(state, "currentSheet", sheet.sheet);
		Vue.set(state, "currentSheetId", sheet._id);
		Vue.set(state.loading, id, false);
	},
	[loadAllType] (state) {
		Vue.set(state.loading, "all", true);
	},
	[loadAllCompleteType] (state, { sheets = [] }) {
		Vue.set(state, "sheets", sheets);
	}
}
