import {
	addSocketType,
	updateSocketStatusType
} from "./mutations";

export const addSocket = ({ commit }, { socket }) => {
	commit(addSocketType, { socket });
};

export const bindEvents = ({ commit, dispatch }, io) => {
	io.on("connect", () => {
		commit(updateSocketStatusType, {
			connected: true
		});
	});
	io.on("connect_error", (error) => {
		commit(updateSocketStatusType, {
			connected: false,
			error: error.message
		});
	});
	io.on("disconnect", (reason) => {
		commit(updateSocketStatusType, {
			connected: false,
			error: reason
		});
	});

	// io.on(socketEvents.server.UPDATE_SETS, (sets) => {
	// 	dispatch("sets/updateSets", sets, { root: true });
	// });
};
