import { getTraitDots, getMaxSpend, getAbilitiesCost, getDotsMetaDisplay } from "@/data/_utils";

export const description = "Executing a mortal with a sword starts investigations. Clawing someone to ribbons tears the edges of the Masquerade. So Cainites adapt, and many have devoted their energies to learning how to kill with guns. This Skill represents familiarity with a range of firearms, from holdout pistols to heavy machine guns. Further, someone skilled in Firearms can clean, repair, recognize, and accurately fire most forms of small arms. This Skill is also used to unjam guns (Wits + Firearms).";

const dots = [
	{
		dot: 1,
		description: "**Novice:** You had a BB gun as a kid."
	},
	{
		dot: 2,
		description: "**Practiced:** You while away the occasional hour at the gun club."
	},
	{
		dot: 3,
		description: "**Competent:** You’ve survived a firefight or two."
	},
	{
		dot: 4,
		description: "**Expert:** You could pick off people for a living."
	},
	{
		dot: 5,
		description: "**Master:** You’ve been practicing since the debut of the Winchester."
	}
];

export default {
	label: "Firearms",
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
