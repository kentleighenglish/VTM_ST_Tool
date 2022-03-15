import {
	updateMetaFieldType
} from "./mutations";

export const updateMetaField = ({ commit }, { text }) => {
	commit(updateMetaFieldType, { text });
};
