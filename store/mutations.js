import Vue from "vue";

export const setAdminModeType = "@setAdminMode";

export default {
	[setAdminModeType] (state, { mode }) {
		Vue.set(state, "adminMode", mode);
	}
}
