import { getTraitDots, getMaxSpend, getAbilitiesCost, getDotsMetaDisplay } from "@/data/_utils";

export const description = "You have at least a basic understanding of most of the physical sciences, such as chemistry, biology, physics, and geology. This Knowledge can be put to all forms of practical use. In most cases, a player should select a specialty to reflect a focus for her character’s scientific studies, but this isn’t strictly necessary.";

const dots = [
	{
		dot: 1,
		description: "**Student:** You know most of the high-school basics"
	},
	{
		dot: 2,
		description: "**College:** You’re familiar with the major theories."
	},
	{
		dot: 3,
		description: "**Masters:** You could teach high-school science."
	},
	{
		dot: 4,
		description: "**Doctorate:** You’re fully capable of advancing the knowledge in your field."
	},
	{
		dot: 5,
		description: "**Scholar:** Your Nobel Prize is waiting for you."
	}
];

export default {
	label: "Science",
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
