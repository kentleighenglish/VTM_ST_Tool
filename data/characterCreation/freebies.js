import { omit } from "lodash";
import { sheetSkeleton } from "@/data/chardata";
import * as physical from "@/data/attributes/physical";
import * as social from "@/data/attributes/social";
import * as mental from "@/data/attributes/mental";
import * as talents from "@/data/abilities/talents";
import * as skills from "@/data/abilities/skills";
import * as knowledges from "@/data/abilities/knowledges";
// import * as disciplines from "@/data/advantages/disciplines";
// import * as backgrounds from "@/data/advantages/backgrounds";

// Setup
const physicalAttributes = Object.keys(physical);
const socialAttributes = Object.keys(social);
const mentalAttributes = Object.keys(mental);
const attributes = [
	...physicalAttributes,
	...socialAttributes,
	...mentalAttributes
];
const talentsAbilities = Object.keys(talents);
const skillsAbilities = Object.keys(skills);
const knowledgesAbilities = Object.keys(knowledges);
const abilities = [
	...talentsAbilities,
	...skillsAbilities,
	...knowledgesAbilities
];
// const disciplinesKeys = Object.keys(disciplines);
// const backgroundsKeys = Object.keys(backgrounds);
const virtuesKeys = Object.keys(sheetSkeleton.advantages.fields.virtues.fields);

const getType = (name, path) => {
	switch (true) {
	case attributes.includes(name):
		return "attributes";
	case abilities.includes(name):
		return "abilities";
	case (name === "list" && path.includes("disciplines")):
		return "disciplines";
	case (name === "list" && path.includes("backgrounds")):
		return "backgrounds";
	case virtuesKeys.includes(name):
		return "virtues";
	case name === "willpower":
		return "willpower";
	case name === "humanityPath":
		return "humanity";
	}
}

export const title = "Character Freebies";

export const freebiesMode = true;

export const subtitle = "Spend your freebie points to wrap up character creation.";

export const fields = {
	attributes: sheetSkeleton.attributes,
	abilities: sheetSkeleton.abilities,
	advantages: sheetSkeleton.advantages,
	status: omit(sheetSkeleton.status, [
		"fields.condition.fields.willpowerStatus",
		"fields.condition.fields.bloodPool",
		"fields.other.fields.health"
	])
};

const costs = {
	attributes: 5,
	abilities: 2,
	disciplines: 7,
	backgrounds: 1,
	virtues: 2,
	humanity: 2,
	willpower: 1
};

const getMaxSpend = (form, type, priority, characterType) => {
	let baseDots = 0;

	const attributes = (form.sheet?.attributes?.[type] || {});

	Object.values(attributes).forEach((val) => {
		if (val > 1) {
			baseDots = Math.max(0, baseDots - (val - 1));
		}
	});

	return baseDots;
}

export const overrideField = ({ field, name, path, form }) => {
	const type = getType(name, path);

	if (type && costs[type]) {
		const cost = costs[type];

		if (name === "list") {
			console.log(cost);
		} else {
			return {
				...field,
				meta: {
					...field.meta,
					params: {
						...field.meta.params
						// maxSpendDots: (model, { propPath }) => {
						// 	const value = get(model, propPath, 0);
						// 	return Math.max(1, value + maxSpendDots);
						// }
					},
					getXpCost: ({ current, target }) => {
						return target - current
					}
				}
			}
		}
	}

	return field;
}

export const xpCheck = ({ name, cost, form, definition }) => {
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
