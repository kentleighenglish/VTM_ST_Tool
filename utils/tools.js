import { get, set } from "lodash";

export const setDefault = (input, path, val) => {
	const currentVal = get(input, path);
	if (!currentVal) {
		set(input, path, val);
	}
};
