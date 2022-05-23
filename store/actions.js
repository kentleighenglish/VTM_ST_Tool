import {
	setAdminModeType,
	openModalType,
	closeModalType
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
