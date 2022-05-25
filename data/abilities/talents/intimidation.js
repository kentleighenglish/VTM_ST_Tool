import { getTraitDots, getMaxSpend, getAbilitiesCost, getDotsMetaDisplay } from "@/data/_utils";

export const description = "Intimidation takes many forms, from outright threats and physical violence to mere force of personality. It needn’t be course or callous, and a well-placed intimidating word under the right circumstances might well be called “diplomacy” in certain circles. You know the right method for each occasion, and can be very… persuasive.";

const dots = [
	{
		dot: 1,
		description: "**Novice:** Shady teenager"
	},
	{
		dot: 2,
		description: "**Practiced:** Skinhead thug"
	},
	{
		dot: 3,
		description: "**Competent:** Drill sergeant"
	},
	{
		dot: 4,
		description: "**Expert:** Your air of authority cows casual passersby."
	},
	{
		dot: 5,
		description: "**Master:** You can frighten off vicious animals. "
	}
];

export default {
	label: "Intimidation",
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
