import {
	pushMessageType
} from "./mutations";

export const globalPushMessage = dispatch => (message = {}) => dispatch("toast/pushMessage", message, { root: true });

export const pushMessage = ({ commit }, message) => {
	const id = btoa(JSON.stringify(message));

	commit(pushMessageType, {
		id,
		type: "default",
		body: "",
		...message
	});
}
