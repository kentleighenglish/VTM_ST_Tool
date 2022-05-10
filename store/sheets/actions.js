import {
	updateMetaFieldType,
	loadSheetType,
	loadSheetCompleteType
} from "./mutations";

export const updateMetaField = ({ commit }, { text }) => {
	commit(updateMetaFieldType, { text });
};

export const createSheet = ({ dispatch, commit, rootState }, { sheet }) => {
	const { socket } = rootState.socket;

	return new Promise((resolve, reject) => {
		socket().emit("createSheet", { sheet }, ({ id, error }) => {
			if (id) {
				resolve({ id });
			} else {
				console.error(error);
				resolve({ id: null });
			}
		});
	});
};

export const loadSheet = async ({ commit, rootState }, { id }) => {
	const { socket } = rootState.socket;
	commit(loadSheetType, { id });

	await new Promise((resolve) => {
		socket().emit("loadSheet", { id }, ({ sheet }) => {
			if (sheet) {
				commit(loadSheetCompleteType, { id, sheet });

				resolve();
			}
		});
	});
}
