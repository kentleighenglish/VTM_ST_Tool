import { get } from "lodash";

export const getTraitDots = (data) => {
	const gen = data?.details?.vampire?.generation || 10;

	if (gen > 7) {
		return 5;
	}

	const calculated = (5 + (8 - gen));

	return calculated > 10 ? 10 : calculated;
}

export const getDisciplineDots = (data) => {
	const gen = data?.details?.vampire?.generation || 10;

	if (gen > 7) {
		return 5;
	}

	const calculated = (5 + (8 - gen));

	return calculated > 10 ? 10 : calculated;
}

export const getAttributeCost = (current = 0, target) => {
	let xp = 0;
	for (let i = current; i < target; i++) {
		xp += i * 4;
	}

	return xp;
};

export const getAbilitiesCost = (current = 0, target) => {
	let xp = 0;

	if (current === 0) {
		xp = 3;
		current++;
	}

	for (let i = current; i < target; i++) {
		xp += i * 2;
	}

	return xp;
};

export const getMaxSpend = costFunc => (data, { adminMode, xpPoints, propPath }) => {
	if (adminMode) {
		return 100;
	}

	const current = get(data, propPath.join("."), 0);
	const target = get(data, propPath.join("."), 0) + 1;

	const checkTarget = (t) => {
		const xpCost = costFunc(current, t);

		if (xpCost > xpPoints) {
			return t - 1;
		} else {
			return checkTarget(t + 1);
		}
	}

	return checkTarget(target);
}
