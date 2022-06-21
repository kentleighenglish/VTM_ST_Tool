import { get } from "lodash";
import * as characterTypes from "./characterTypes";
import { sheetSkeleton } from "@/data/chardata";
import * as disciplines from "@/data/advantages/disciplines";
import * as backgrounds from "@/data/advantages/backgrounds";

export const title = "Character Advantages";

export const subtitle = "Please allocate dots into your disciplines, background, and virtues";

export const fields = sheetSkeleton.advantages;

const disciplinesKeys = Object.keys(disciplines);
const backgroundsKeys = Object.keys(backgrounds);
const virtuesKeys = Object.keys(sheetSkeleton.advantages.fields.virtues.fields
);
const advantages = [
	...disciplinesKeys,
	...backgroundsKeys,
	...virtuesKeys
];

const initialDisciplines = Object.keys(characterTypes).reduce((acc, key) => ({
	...acc,
	[key]: characterTypes[key].initialDisciplines
}), {});
const initialBackgrounds = Object.keys(characterTypes).reduce((acc, key) => ({
	...acc,
	[key]: characterTypes[key].initialBackgrounds
}), {});
const initialVirtues = Object.keys(characterTypes).reduce((acc, key) => ({
	...acc,
	[key]: characterTypes[key].initialVirtues
}), {});

const getType = (name) => {
	if (disciplinesKeys.includes(name)) {
		return "disciplines";
	} else if (backgroundsKeys.includes(name)) {
		return "backgrounds";
	} else if (virtuesKeys.includes(name)) {
		return "virtues";
	}
};

const getMaxSpend = (form, type, characterType) => {
	let baseDots = 0;
	const disciplineBase = initialDisciplines[characterType] || {};
	const backgroundsBase = initialBackgrounds[characterType] || {};
	const virtuesBase = initialVirtues[characterType] || {};

	if (type === "disciplines") {
		baseDots = disciplineBase || 0;
	} else if (type === "backgrounds") {
		baseDots = backgroundsBase || 0;
	} else if (type === "virtues") {
		baseDots = virtuesBase || 0;
	}

	const fields = (form.sheet?.advantages?.[type] || {});
	console.log(fields);

	// Object.values(abilities).forEach((val) => {
	// 	baseDots = baseDots - (val || 0);
	// });

	return Math.min(3, baseDots);
}

export const overrideField = (field, name, form, { characterType }) => {
	if (advantages.includes(name)) {
		const type = getType(name);
		const maxSpendDots = getMaxSpend(form, type, characterType);

		return {
			...field,
			meta: {
				...field.meta,
				params: {
					...field.meta.params,
					maxSpendDots: (model, { propPath }) => {
						const value = get(model, propPath, 0);
						return Math.min(3, value + maxSpendDots);
					}
				},
				getXpCost: ({ current, target }) => {
					return target - current
				}
			}
		}
	}

	return field;
}

export const xpCheck = ({ name, cost, form, definition }) => {
	const { characterType } = definition;

	if (advantages.includes(name)) {
		const type = getType(name);
		const maxSpendDots = getMaxSpend(form, type, characterType);

		return cost <= maxSpendDots;
	}

	return false;
}

export const stageComplete = (form, { characterType, abilityPriority }) => {
	const talentsSpend = getMaxSpend(form, "talents", abilityPriority, characterType);
	const skillsSpend = getMaxSpend(form, "skills", abilityPriority, characterType);
	const knowledgesSpend = getMaxSpend(form, "knowledges", abilityPriority, characterType);

	return (
		talentsSpend === 0 &&
		skillsSpend === 0 &&
		knowledgesSpend === 0
	);
}
