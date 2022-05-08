import Vue from "vue";

export const addSocketType = "@socket/addSocket";

export default {
	[addSocketType] (state, { socket }) {
		Vue.set(state, "socket", socket);
	}
}
