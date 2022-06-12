import {
	globalPushMessage
} from "@/store/toast/actions";

export const triggerAction = async ({ commit, dispatch, rootState }, payload) => {
	const { socket, events } = rootState.socket;

	await new Promise((resolve) => {
		socket().emit(events.actions.triggerAction, payload, (error, { action: savedAction }) => {
			if (error) {
				globalPushMessage(dispatch)({
					type: "error",
					body: error.message || error
				});
			} else if (savedAction) {
				resolve(savedAction);
			}
		});
	});
}
