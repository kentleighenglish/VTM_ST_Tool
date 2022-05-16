import {
	setAdminModeType
} from "./mutations";

export const setAdminMode = ({ commit }, mode) => {
	commit(setAdminModeType, { mode });
}
