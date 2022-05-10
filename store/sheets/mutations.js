import Vue from "vue";

export const updateMetaFieldType = "@sheets/updateMetaField";
export const createSheetType = "@sheets/createSheet";

export default {
	[updateMetaFieldType] (state, { text }) {
		Vue.set(state.metaDisplay, "text", text);
	}
}
