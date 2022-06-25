import { get } from "lodash";
import * as characterTypes from "./characterTypes";
import { sheetSkeleton } from "@/data/chardata";
import * as physical from "@/data/attributes/physical";
import * as social from "@/data/attributes/social";
import * as mental from "@/data/attributes/mental";
import { setDefault } from "@/utils/tools";

const physicalAttributes = Object.keys(physical);
const socialAttributes = Object.keys(social);
const mentalAttributes = Object.keys(mental);
const attributes = [
	...physicalAttributes,
	...socialAttributes,
	...mentalAttributes
];

export const title = "Character Attributes";

export const subtitle = "Please allocate dots into your primary, secondary, and tertiary attributes";

export const fields = sheetSkeleton.attributes;

const getPriority = (name, priorities) => {
	let type;
	switch (true) {
	case physicalAttributes.includes(name):
		type = "physical";
		break;
	case socialAttributes.includes(name):
		type = "social";
		break;
	case mentalAttributes.includes(name):
		type = "mental";
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

const initialAttributes = Object.keys(characterTypes).reduce((acc, key) => ({
	...acc,
	[key]: characterTypes[key].initialAttributes
}), {});

const getMaxSpend = (form, type, priority, characterType) => {
	let baseDots = 0;
	const initial = initialAttributes[characterType] || {};

	if (priority === "primary") {
		baseDots = initial[0] || 0;
	} else if (priority === "secondary") {
		baseDots = initial[1] || 0;
	} else {
		baseDots = initial[2] || 0;
	}

	const attributes = (form.sheet?.attributes?.[type] || {});

	Object.values(attributes).forEach((val) => {
		if (val > 1) {
			baseDots = Math.max(0, baseDots - (val - 1));
		}
	});

	return baseDots;
}

export const overrideField = (field, name, form, { characterType, attributePriority = {} }) => {
	if (attributes.includes(name)) {
		const { type, priority } = getPriority(name, attributePriority);
		const maxSpendDots = getMaxSpend(form, type, priority, characterType);

		return {
			...field,
			meta: {
				...field.meta,
				params: {
					...field.meta.params,
					maxSpendDots: (model, { propPath }) => {
						const value = get(model, propPath, 0);
						return Math.max(1, value + maxSpendDots);
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
	const { attributePriority = {}, characterType } = definition;

	if (attributes.includes(name)) {
		const { type, priority } = getPriority(name, attributePriority);
		const maxSpendDots = getMaxSpend(form, type, priority, characterType);

		return cost <= maxSpendDots;
	}

	return false;
}

export const stageComplete = (form, { characterType, attributePriority }) => {
	const physicalSpend = getMaxSpend(form, "physical", attributePriority, characterType);
	const socialSpend = getMaxSpend(form, "social", attributePriority, characterType);
	const mentalSpend = getMaxSpend(form, "mental", attributePriority, characterType);

	return (
		physicalSpend === 0 &&
		socialSpend === 0 &&
		mentalSpend === 0
	);
}

export const stageEvents = {
	enter: (form) => {
		physicalAttributes.forEach(key => setDefault(form, `sheet.attributes.physical.${key}`, 1))
		socialAttributes.forEach(key => setDefault(form, `sheet.attributes.social.${key}`, 1))
		mentalAttributes.forEach(key => setDefault(form, `sheet.attributes.mental.${key}`, 1))
	}
}
