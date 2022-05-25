import { getTraitDots, getMaxSpend, getAbilitiesCost, getDotsMetaDisplay } from "@/data/_utils";

export const description = "You understand the emotions of others, and can sympathize with, feign sympathy for, or play on such emotions as you see fit. You are adept at discerning motive, and might be able to discern when someone’s lying to you. However, you may be so in tune with other people’s feelings that your own emotions are affected.";

const dots = [
	{
		dot: 1,
		description: "**Novice:** You lend the occasional shoulder to cry on."
	},
	{
		dot: 2,
		description: "**Practiced:** You can sometimes literally feel someone else’s suffering."
	},
	{
		dot: 3,
		description: "**Competent:** You have a keen insight into other people’s motivations."
	},
	{
		dot: 4,
		description: "**Expert:** It’s almost impossible to lie to you."
	},
	{
		dot: 5,
		description: "**Master:** The human soul conceals no mysteries from you."
	}
];

export default {
	label: "Empathy",
	type: "dots",
	meta: {
		params: {
			maxDots: getTraitDots,
			maxSpendDots: getMaxSpend(getAbilitiesCost)
		},
		getXpCost: getAbilitiesCost,
		getMetaDisplay: getDotsMetaDisplay({ dots, description })
	}
};
