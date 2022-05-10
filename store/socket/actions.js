import {
	addSocketType,
	updateSocketStatusType
} from "./mutations";

export const addSocket = ({ commit, dispatch }, { socket }) => {
	commit(addSocketType, { socket });

	const socketIo = socket();

	dispatch("bindEvents", socketIo);
};

export const bindEvents = ({ commit, dispatch }, socketIo) => {
	socketIo.on("connect", () => {
		commit(updateSocketStatusType, {
			connected: true
		});
	});
	socketIo.on("connect_error", (error) => {
		commit(updateSocketStatusType, {
			connected: false,
			error: error.message
		});
	});
	socketIo.on("disconnect", (reason) => {
		commit(updateSocketStatusType, {
			connected: false,
			error: reason
		});
	});

	// io.on(socketEvents.server.UPDATE_SETS, (sets) => {
	// 	dispatch("sets/updateSets", sets, { root: true });
	// });
};
