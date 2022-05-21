import {
	updateMetaFieldType,
	loadType,
	loadCompleteType,
	loadAllType,
	loadAllCompleteType
} from "./mutations";
import {
	globalPushMessage
} from "@/store/toast/actions";

export const updateMetaField = ({ commit }, { text }) => {
	commit(updateMetaFieldType, { text });
};

export const create = ({ dispatch, commit, rootState }, { ...fields }) => {
	const { socket, events } = rootState.socket;

	return new Promise((resolve, reject) => {
		socket().emit(events.characters.create, { ...fields }, (error, updatedCharacter) => {
			if (error) {
				globalPushMessage(dispatch)({
					type: "error",
					body: error.message
				});
				resolve({ id: null });
			} else {
				resolve({ id: updatedCharacter.id });
				commit(loadCompleteType, { id: updatedCharacter.id, character: updatedCharacter });
			}
		});
	});
};

export const update = ({ dispatch, commit, rootState }, { id, ...fields }) => {
	const { socket, events } = rootState.socket;

	return new Promise((resolve, reject) => {
		socket().emit(events.characters.update, { id, ...fields }, (error, updatedCharacter) => {
			if (error) {
				globalPushMessage(dispatch)({
					type: "error",
					body: error.message
				});
				resolve({ id: null });
			} else if (id) {
				resolve({ id });
				commit(loadCompleteType, { id: updatedCharacter.id, character: updatedCharacter });
			}
		});
	});
};

export const load = async ({ dispatch, commit, rootState }, { id }) => {
	const { socket, events } = rootState.socket;
	commit(loadType, { id });

	await new Promise((resolve) => {
		socket().emit(events.characters.fetch, { id }, (error, { character }) => {
			if (error) {
				globalPushMessage(dispatch)({
					type: "error",
					body: error
				});
				resolve({ id: null });
			} else if (character) {
				commit(loadCompleteType, { id, character });

				resolve();
			}
		});
	});
}

export const loadAll = async ({ commit, dispatch, rootState }, { filter }) => {
	const { socket, events } = rootState.socket;
	commit(loadAllType, {});

	await new Promise((resolve) => {
		socket().emit(events.characters.fetchAll, { filter }, (error, { characters }) => {
			if (error) {
				globalPushMessage(dispatch)({
					type: "error",
					body: error.message
				});
			} else if (characters) {
				commit(loadAllCompleteType, { characters });

				resolve();
			}
		});
	});
}

export const rewardXp = async ({ commit, dispatch, rootState }, { id, amount }) => {
	const { socket, events } = rootState.socket;

	await new Promise((resolve) => {
		socket().emit(events.characters.rewardXp, { id, amount }, (error, { character }) => {
			if (error) {
				globalPushMessage(dispatch)({
					type: "error",
					body: error.message
				});
			} else if (character) {
				commit(loadCompleteType, { id, character });
				resolve();
			}
		});
	});
}

export const removeXp = async ({ commit, dispatch, rootState }, { id, amount }) => {
	const { socket, events } = rootState.socket;

	await new Promise((resolve) => {
		socket().emit(events.characters.removeXp, { id, amount }, (error, { character }) => {
			if (error) {
				globalPushMessage(dispatch)({
					type: "error",
					body: error.message
				});
			} else if (character) {
				commit(loadCompleteType, { id, character });
				resolve();
			}
		});
	});
}
