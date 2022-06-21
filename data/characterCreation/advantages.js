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
	if (name === "disciplines" || disciplinesKeys.includes(name)) {
		return "disciplines";
	} else if (name === "backgrounds" || backgroundsKeys.includes(name)) {
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

	const fields = (form.sheet?.advantages || {});
	console.log(fields, type, baseDots);

	// Object.values(abilities).forEach((val) => {
	// 	baseDots = baseDots - (val || 0);
	// });

	return Math.min(3, baseDots);
}

export const overrideField = (field, name, form, { characterType }) => {
	if (["disciplines", "backgrounds"].includes(name)) {
		const listField = field.fields.list;
		const maxSpendDots = getMaxSpend(form, name, characterType);

		return {
			...field,
			fields: {
				list: {
					...listField,
					meta: {
						...listField.meta,
						params: {
							...listField.meta.params,
							fieldMeta: (data = {}, { propPath, ...additional } = { propPath: [] }) => () => ({
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
							})
						},
						disableAdd: name === "disciplines"
					}
				}
			}
		}
	} else if (virtuesKeys.includes(name)) {
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
	const disciplinesSpend = getMaxSpend(form, "disciplines", characterType);
	const backgroundsSpend = getMaxSpend(form, "backgrounds", characterType);
	const virtuesSpend = getMaxSpend(form, "virtues", characterType);

	return (
		disciplinesSpend === 0 &&
		backgroundsSpend === 0 &&
		virtuesSpend === 0
	);
}
