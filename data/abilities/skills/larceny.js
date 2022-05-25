import { getTraitDots, getMaxSpend, getAbilitiesCost, getDotsMetaDisplay } from "@/data/_utils";

export const description = "This Skill entails familiarity with the tools and techniques for the sorts of physical manipulation typically associated with criminal activity. Picking locks, manual forgery, safecracking, simple hotwiring, various forms of breaking and entering, and even sleight-of-hand all fall under the auspices of Larceny. Larceny is useful not only for theft, but also for setting up “the unbeatable system” or deducing where a thief broke in. This skill does not confer any aptitude with advanced security or anti-crime technologies such as video surveillance or alarm systems — those are covered by the Technology Knowledge.";

const dots = [
	{
		dot: 1,
		description: "**Novice:** You can pick a simple lock."
	},
	{
		dot: 2,
		description: "**Practiced:** You could run a shell game hustle on the corner."
	},
	{
		dot: 3,
		description: "**Competent:** You can open a standard locked window from the outside."
	},
	{
		dot: 4,
		description: "**Expert:** You can “retool” a passport or ID card."
	},
	{
		dot: 5,
		description: "**Master:** You could get into (or out of…) a multinational bank’s central vault."
	}
];
export default {
	label: "Larceny",
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
