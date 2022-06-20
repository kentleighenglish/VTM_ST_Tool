import { sheetSkeleton } from "@/data/chardata";
import * as physical from "@/data/attributes/physical";
import * as social from "@/data/attributes/social";
import * as mental from "@/data/attributes/mental";

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

export const stageComplete = ({ sheet }) => {
	return (
		true
	)
}

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

const getMaxSpend = (form, type, priority) => {
	let baseDots = 0;
	if (priority === "primary") {
		baseDots = 7;
	} else if (priority === "secondary") {
		baseDots = 5;
	} else {
		baseDots = 3;
	}

	const attributes = (form.sheet?.attributes?.[type] || {});

	Object.values(attributes).forEach((val) => {
		if (val > 1) {
			baseDots = Math.max(0, baseDots - (val - 1));
		}
	});

	return baseDots + 1;
}

export const overrideField = (field, name, form, { attributePriority = {} }) => {
	if (attributes.includes(name)) {
		const { type, priority } = getPriority(name, attributePriority);
		const maxSpendDots = getMaxSpend(form, type, priority);

		return {
			...field,
			meta: {
				...field.meta,
				params: {
					...field.meta.params,
					maxSpendDots: () => maxSpendDots
				},
				getXpCost: () => 0
			}
		}
	}

	return field;
}
