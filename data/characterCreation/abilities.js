import { get } from "lodash";
import * as characterTypes from "./characterTypes";
import { sheetSkeleton } from "@/data/chardata";
import * as talents from "@/data/abilities/talents";
import * as skills from "@/data/abilities/skills";
import * as knowledges from "@/data/abilities/knowledges";

const talentsAbilities = Object.keys(talents);
const skillsAbilities = Object.keys(skills);
const knowledgesAbilities = Object.keys(knowledges);
const abilities = [
	...talentsAbilities,
	...skillsAbilities,
	...knowledgesAbilities
];

export const title = "Character Abilities";

export const subtitle = "Please allocate dots into your primary, secondary, and tertiary abilities";

export const fields = sheetSkeleton.abilities;

const getPriority = (name, priorities) => {
	let type;
	switch (true) {
	case talentsAbilities.includes(name):
		type = "talents";
		break;
	case skillsAbilities.includes(name):
		type = "skills";
		break;
	case knowledgesAbilities.includes(name):
		type = "knowledges";
		break;
	}

	const priorityValues = Object.values(priorities);
	const index = priorityValues.indexOf(type);
	const key = Object.keys(priorities)[index];

	return {
		type,
		priority: key
	};
}

const initialAbilities = Object.keys(characterTypes).reduce((acc, key) => ({
	...acc,
	[key]: characterTypes[key].initialAbilities
}), {});

const getMaxSpend = (form, type, priority, characterType) => {
	let baseDots = 0;
	const initial = initialAbilities[characterType] || {};

	if (priority === "primary") {
		baseDots = initial[0] || 0;
	} else if (priority === "secondary") {
		baseDots = initial[1] || 0;
	} else {
		baseDots = initial[2] || 0;
	}

	const abilities = (form.sheet?.abilities?.[type] || {});

	Object.values(abilities).forEach((val) => {
		baseDots = baseDots - (val || 0);
	});

	return Math.min(3, baseDots);
}

export const overrideField = (field, name, form, { characterType, abilityPriority = {} }) => {
	if (abilities.includes(name)) {
		const { type, priority } = getPriority(name, abilityPriority);
		const maxSpendDots = getMaxSpend(form, type, priority, characterType);

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
	const { abilityPriority = {}, characterType } = definition;

	if (abilities.includes(name)) {
		const { type, priority } = getPriority(name, abilityPriority);
		const maxSpendDots = getMaxSpend(form, type, priority, characterType);

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
