import {
	pushMessageType
} from "./mutations";

export const globalPushMessage = dispatch => (message = {}) => dispatch(`toast/${pushMessageType}`, message, { root: true });

export const pushMessage = ({ commit }, message) => {
	const id = atob(JSON.stringify(message));

	commit(pushMessageType, {
		id,
		type: "default",
		body: "",
		...message
	});
}
