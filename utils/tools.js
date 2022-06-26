import { get, set } from "lodash";

export const flattenObject = (object, path = []) => {
	const parseProp = (prop, path) => {
		if (typeof prop === "object" && !Array.isArray(prop)) {
			return Object.keys(prop).reduce((acc, key) => ({
				...acc,
				...parseProp(prop[key], [...path, key])
			}), {});
		} else if (Array.isArray(prop)) {
			const key = path.pop();
			return {
				...prop.reduce((acc, arrVal, index) => ({
					...acc,
					...parseProp(arrVal, [...path, `${key}[${index}]`])
				}), {})
			}
		} else {
			return {
				[path.join(".")]: prop
			}
		}
	}

	return parseProp(object, []);
}

export const setDefault = (input, path, val) => {
	const currentVal = get(input, path);
	if (!currentVal) {
		set(input, path, val);
	}
};

export const deepDiff = (obj1, obj2) => {
	const obj1flat = flattenObject(obj1);
	const obj2flat = flattenObject(obj2);
	const diff = {};

	Object.keys(obj2flat).forEach((key) => {
		const value = obj2flat[key];

		if (obj1flat[key] === undefined || (obj1flat[key] !== undefined && obj1flat[key] !== value)) {
			set(diff, key, value);
		}
	});

	return diff;
}
