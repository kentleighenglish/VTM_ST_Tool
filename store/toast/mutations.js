import Vue from "vue";

export const pushMessageType = "@toast/pushMessage";
export const dismissMessageType = "@toast/dismissMessage";

export default {
	[pushMessageType]: (state, message) => {
		const messages = [
			...state.messages,
			message
		];

		Vue.set(state, "messages", messages);
	},
	[dismissMessageType]: (state, messageId) => {
		const messages = state.messages.filter(message => message.id !== messageId);

		Vue.set(state, "messages", messages);
	}
}
