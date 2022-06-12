import {
	globalPushMessage
} from "@/store/toast/actions";

export const triggerAction = ({ commit, dispatch, rootState }, payload) => {
	const { socket, events } = rootState.socket;

	return new Promise((resolve) => {
		socket().emit(events.actions.triggerAction, payload, (error, response) => {
			if (error) {
				globalPushMessage(dispatch)({
					type: "error",
					body: error.message || error
				});
				resolve();
			} else if (response && response.action) {
				resolve(response.action);
			} else {
				resolve();
			}
		});
	});
}
