import {
	updateMetaFieldType,
	loadType,
	loadCompleteType,
	loadAllType,
	loadAllCompleteType
} from "./mutations";

export const updateMetaField = ({ commit }, { text }) => {
	commit(updateMetaFieldType, { text });
};

export const create = ({ dispatch, commit, rootState }, { sheet }) => {
	const { socket, events } = rootState.socket;

	return new Promise((resolve, reject) => {
		socket().emit(events.sheets.create, { sheet }, ({ id, error }) => {
			if (id) {
				resolve({ id });
			} else {
				console.error(error);
				resolve({ id: null });
			}
		});
	});
};

export const load = async ({ commit, rootState }, { id }) => {
	const { socket, events } = rootState.socket;
	commit(loadType, { id });

	await new Promise((resolve) => {
		socket().emit(events.sheets.fetch, { id }, ({ sheet }) => {
			if (sheet) {
				commit(loadCompleteType, { id, sheet });

				resolve();
			}
		});
	});
}

export const loadAll = async ({ commit, rootState }, { filter }) => {
	const { socket, events } = rootState.socket;
	commit(loadAllType, {});

	await new Promise((resolve) => {
		socket().emit(events.sheets.fetchAll, { filter }, ({ sheets }) => {
			if (sheets) {
				commit(loadAllCompleteType, { sheets });

				resolve();
			}
		});
	});
}
