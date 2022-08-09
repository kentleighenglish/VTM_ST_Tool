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
		socket().emit(events.rooms.addSessionCharacter, { id }, (error) => {
			if (error) {
				globalPushMessage(dispatch)({
					type: "error",
					body: error.message || error
				});
			}

			resolve();
		});
	});
}

export const removeSessionCharacter = async ({ commit, dispatch, rootState }, { id }) => {
	const { socket, events } = rootState.socket;

	await new Promise((resolve) => {
		socket().emit(events.rooms.removeSessionCharacter, { id }, (error) => {
			if (error) {
				globalPushMessage(dispatch)({
					type: "error",
					body: error.message || error
				});
			}

			resolve();
		});
	});
}

export const rollSceneInitiative = async ({ commit, dispatch, rootState }) => {
	const { socket, events } = rootState.socket;

	await new Promise((resolve) => {
		socket().emit(events.rooms.rollSceneInitiative, {}, (error) => {
			if (error) {
				globalPushMessage(dispatch)({
					type: "error",
					body: error.message || error
				});
			}

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

export const resetScene = async ({ commit, dispatch, rootState }) => {
	const { socket, events } = rootState.socket;

	await new Promise((resolve) => {
		socket().emit(events.rooms.resetScene, {}, (error) => {
			if (error) {
				globalPushMessage(dispatch)({
					type: "error",
					body: error.message || error
				});
			}

			resolve();
		});
	});
}

export const buffAttribute = async ({ commit, dispatch, rootState }, { id, attribute, buffLevel }) => {
	const { socket, events } = rootState.socket;

	await new Promise((resolve) => {
		socket().emit(events.rooms.buffAttribute, { id, attribute, buffLevel: Number(buffLevel) }, (error) => {
			if (error) {
				globalPushMessage(dispatch)({
					type: "error",
					body: error.message || error
				});
			}

			resolve();
		});
	});
}

export const updateSession = ({ commit }, { session }) => {
	commit(updateSessionType, { session });
}
