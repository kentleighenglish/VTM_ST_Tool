import Vue from "vue";

export const addSocketType = "addSocket";
export const updateSocketStatusType = "updateSocketStatus";

export default {
	[addSocketType] (state, { socket }) {
		Vue.set(state, "socket", socket);
	},
	[updateSocketStatusType] (state, { connected, error = null }) {
		Vue.set(state, "connected", connected);
		Vue.set(state, "error", error);
	}
}
