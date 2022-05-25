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

export const getAttributeCost = ({ current = 0, target }) => {
	let xp = 0;
	for (let i = current; i < target; i++) {
		xp += i * 4;
	}

	return xp;
};

export const getAbilitiesCost = ({ current = 0, target }) => {
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

export const getDisciplineCost = ({ current, target, clanDiscipline = false }) => {
	let xp = 0;
	if (current === 0) {
		xp = 10;
		current++;
	}

	// console.log(current, target);
	for (let i = current; i < target; i++) {
		xp += i * (clanDiscipline ? 5 : 7);
	}

	return xp;
}

export const getMaxSpend = costFunc => (data, { adminMode, xpPoints, propPath }) => {
	if (adminMode) {
		return 100;
	}

	const current = get(data, propPath.join("."), 0);
	const target = get(data, propPath.join("."), 0) + 1;

	const checkTarget = (t) => {
		const xpCost = costFunc({ current, target: t, propPath });

		if (xpCost > xpPoints) {
			return t - 1;
		} else {
			return checkTarget(t + 1);
		}
	}

	return checkTarget(target);
}

export const getDotsMetaDisplay = ({ dots, description }) => ({ name, value, meta, hoverDot }) => {
	const output = { description };

	if (hoverDot !== null) {
		const currentDot = dots.find(dot => dot.dot === hoverDot);
		if (currentDot) {
			output.system = currentDot.description;
		}

		const xpCost = meta.getXpCost({ current: value, target: hoverDot, propPath: [name] });

		output.xp = {
			cost: xpCost
		}
	}

	return output;
}
