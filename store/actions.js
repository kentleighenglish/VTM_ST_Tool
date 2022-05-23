import {
	setAdminModeType,
	openModalType,
	closeModalType,
	updateMetaDisplayType,
	setMetaDisplayLockType
} from "./mutations";

export const setAdminMode = ({ commit }, mode) => {
	commit(setAdminModeType, { mode });
}

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
		commit(updateMetaDisplayType, {});
	}
};
