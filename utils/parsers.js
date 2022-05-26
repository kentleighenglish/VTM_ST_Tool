
export const decodeHealthValue = (value) => {
	const splitVal = String(value || 0).split("").reverse();

	return [
		...Array(Number(splitVal[2] || 0)).fill("agg"),
		...Array(Number(splitVal[1] || 0)).fill("lethal"),
		...Array(Number(splitVal[0] || 0)).fill("bashing")
	];
};

export const encodeHealthValue = (array = []) => {
	return array.reduce((acc, val) => {
		if (val === "agg") {
			return acc + 100;
		} else if (val === "lethal") {
			return acc + 10;
		} else if (val === "bashing") {
			return acc + 1;
		}

		return acc;
	}, 0);
}
