import Vue from "vue";

export const setAdminModeType = "@setAdminMode";
export const openModalType = "@openModal";
export const closeModalType = "@closeModal";

export default {
	[setAdminModeType] (state, { mode }) {
		Vue.set(state, "adminMode", mode);
	},
	[openModalType]: (state, { modal, data = {} }) => {
		state.visibleModal = modal;
		state.modalData = data;
	},
	[closeModalType]: (state) => {
		state.visibleModal = null;
		state.modalData = {};
	}
}
