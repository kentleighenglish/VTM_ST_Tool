import { getTraitDots, getMaxSpend, getAbilitiesCost, getDotsMetaDisplay } from "@/data/_utils";

export const description = "This Talent represents your basic athletic ability, as well as any training you might have had in sports or other rigorous activities. Athletics concerns all forms of running, jumping, throwing, swimming, sports, and the like. However, Athletics doesn’t cover basic motor actions such as lifting weights, nor does it govern athletic feats covered by another Ability (such as Melee).";

const dots = [
	{
		dot: 1,
		description: "**Novice:** You had an active childhood."
	},
	{
		dot: 2,
		description: "**Practiced:** High-school athlete"
	},
	{
		dot: 3,
		description: "**Competent:** Talented lifelong amateur"
	},
	{
		dot: 4,
		description: "**Expert:** Professional athlete"
	},
	{
		dot: 5,
		description: "**Master:** Olympic medalist"
	}
];

export default {
	label: "Athletics",
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
