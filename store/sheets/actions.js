import {
	updateMetaFieldType
} from "./mutations";

export const updateMetaField = ({ commit }, { text }) => {
	commit(updateMetaFieldType, { text });
};

export const createSheet = async ({ dispatch, rootState }, sheet) => {
	const { socket } = rootState.socket;

	await new Promise((resolve) => {
		socket().emit("createSheet", sheet, (response) => {
			console.log(response);
			resolve();
		});
	});
};
