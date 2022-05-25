import { getTraitDots, getMaxSpend, getAbilitiesCost, getDotsMetaDisplay } from "@/data/_utils";

export const description = "You understand the nuances of proper behavior, in both mortal society and Kindred culture. In many cases, knowing how to broach a topic is as important as the discussion itself, and a person with poor etiquette will never have an opportunity to make herself heard because she doesn’t know when or how to interject. This Skill is used during meetings, haggling, seduction, dancing, dinner etiquette, and all forms of diplomacy.";

const dots = [
	{
		dot: 1,
		description: "**Novice:** You know when to keep your mouth shut."
	},
	{
		dot: 2,
		description: "**Practiced:** You’ve been to a black-tie event or two."
	},
	{
		dot: 3,
		description: "**Competent:** You know your way around even obscure silverware."
	},
	{
		dot: 4,
		description: "**Expert:** Her Majesty would consider you charming."
	},
	{
		dot: 5,
		description: "**Master:** If the right people came to dinner, you could end wars — or start them."
	}
];

export default {
	label: "Etiquette",
	type: "dots",
	meta: {
		params: {
			maxDots: getTraitDots,
			maxSpendDots: getMaxSpend(getAbilitiesCost)
		},
		getXpCost: getAbilitiesCost,
		getMetaDisplay: getDotsMetaDisplay({ dots, description })
	}
}
