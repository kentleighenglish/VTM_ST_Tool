import {
	updateSessionType
} from "./mutations";
import {
	globalPushMessage
} from "@/store/toast/actions";

export const triggerUpdateSession = ({ commit }, { session }) => {
	commit(updateSessionType, { session });
}

export const addSessionCharacter = async ({ commit, dispatch, rootState }, { id }) => {
	const { socket, events } = rootState.socket;

	await new Promise((resolve) => {
		socket().emit(events.rooms.addSessionCharacter, { id }, (error, { session }) => {
			if (error) {
				globalPushMessage(dispatch)({
					type: "error",
					body: error.message || error
				});
			}
			commit(updateSessionType, { session });

			resolve();
		});
	});
}

export const removeSessionCharacter = async ({ commit, dispatch, rootState }, { id }) => {
	const { socket, events } = rootState.socket;

	await new Promise((resolve) => {
		socket().emit(events.rooms.removeSessionCharacter, { id }, (error, { session }) => {
			if (error) {
				globalPushMessage(dispatch)({
					type: "error",
					body: error.message || error
				});
			}
			commit(updateSessionType, { session });

			resolve();
		});
	});
}

export const fetchSession = async ({ commit, dispatch, rootState }) => {
	const { socket, events } = rootState.socket;

	await new Promise((resolve) => {
		socket().emit(events.rooms.fetchSession, {}, (error, { session }) => {
			if (error) {
				globalPushMessage(dispatch)({
					type: "error",
					body: error.message || error
				});
			}
			commit(updateSessionType, { session });

			resolve();
		});
	});
}
