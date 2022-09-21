import {
	setAdminModeType,
	openModalType,
	closeModalType,
	updateMetaDisplayType,
	setMetaDisplayLockType
} from "./mutations";
import {
	globalPushMessage
} from "@/store/toast/actions";

export const setAdminMode = ({ commit }, mode) => {
	commit(setAdminModeType, { mode });
}

export const clearCache = ({ dispatch, commit, rootState }, { name }) => {
	const { socket, events } = rootState.socket;

	return new Promise((resolve, reject) => {
		socket().emit(events.admin.clearCache, { name }, (error) => {
			if (error) {
				globalPushMessage(dispatch)({
					type: "error",
					body: error.message || error
				});
				resolve({ id: null });
			}
		});
	});
};

export const openModal = ({ commit, state }, modal) => {
	const payload = typeof modal === "string"
		? { modal, data: {} }
		: modal;

	commit(openModalType, payload);
};

export const closeModal = ({ commit, state }, modal) => {
	commit(closeModalType);
};

export const updateMetaDisplay = ({ commit }, { name = null, description = "", system = "", xp = {} }) => {
	commit(updateMetaDisplayType, { name, description, system, xp });
};

export const setMetaDisplayLock = ({ state, commit }, locked) => {
	if (!locked || (locked && state.metaDisplay.name)) {
		commit(setMetaDisplayLockType, locked);
	}

	if (!locked) {
		// document.dispatchEvent(new Event("mousemove"));
		commit(updateMetaDisplayType, {});
	}
};
