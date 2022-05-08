import {
	addSocketType
} from "./mutations";

export const addSocket = ({ commit }, { socket }) => {
	commit(addSocketType, { socket });
};
