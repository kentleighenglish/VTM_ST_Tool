import {
	addSocketType,
	addEventsType,
	updateSocketStatusType,
	joinRoomType,
	leaveRoomType,
	updateTriggeredType
} from "./mutations";
import {
	globalPushMessage
} from "@/store/toast/actions";

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
			error
		});
		globalPushMessage(dispatch)({
			type: "error",
			body: error
		});
	});
	socketIo.on("disconnect", (reason) => {
		commit(updateSocketStatusType, {
			connected: false,
			error: reason
		});
	});
	socketIo.on("connectResponse", ({ events }) => {
		commit(addEventsType, { events });
	});
	socketIo.on("updateTriggered", ({ sockets = [], updateAvailable = false }) => {
		commit(updateTriggeredType, { sockets, updateAvailable });
	});
};

export const joinRoom = async ({ dispatch, commit, rootState }, { id }) => {
	const { socket, events } = rootState.socket;
	commit(joinRoomType, {});

	await new Promise((resolve) => {
		socket().emit(events.rooms.join, { id }, (error, { sockets }) => {
			if (error) {
				globalPushMessage(dispatch)({
					type: "error",
					body: error
				});
			}
			commit(updateTriggeredType, { sockets });

			resolve();
		});
	});
}

export const leaveRoom = async ({ commit, rootState }, { id }) => {
	const { socket, events } = rootState.socket;
	commit(leaveRoomType, {});

	await new Promise((resolve) => {
		socket().emit(events.rooms.leave, { id });
	});
}
