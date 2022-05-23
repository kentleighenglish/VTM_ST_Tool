import Vue from "vue";

export const setAdminModeType = "@setAdminMode";
export const openModalType = "@openModal";
export const closeModalType = "@closeModal";
export const updateMetaDisplayType = "@updateMetaDisplay";
export const setMetaDisplayLockType = "@setMetaDisplayLock";

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
	},
	[updateMetaDisplayType] (state, { name, description = null, system = null, xp = {} }) {
		Vue.set(state.metaDisplay, "name", name);
		Vue.set(state.metaDisplay, "description", description);
		Vue.set(state.metaDisplay, "system", system);
		Vue.set(state.metaDisplay, "xp", xp);
	},
	[setMetaDisplayLockType] (state, locked) {
		Vue.set(state, "metaDisplayLocked", !!locked);
	}
}
