import { getTraitDots, getMaxSpend, getAbilitiesCost, getDotsMetaDisplay } from "@/data/_utils";

export const description = "You know how to conceal your own motives and project what you wish. Furthermore, if you can root out other people’s motives, you can then use those motives against them. This Talent defines your talent for intrigue, secrets, and double-dealing. Mastery of Subterfuge can make you the ultimate seducer or a brilliant spy.";

const dots = [
	{
		dot: 1,
		description: "**Novice:** You tell the occasional white lie."
	},
	{
		dot: 2,
		description: "**Practiced:** Vampire"
	},
	{
		dot: 3,
		description: "**Competent:** Criminal Lawyer"
	},
	{
		dot: 4,
		description: "**Expert:** Deep-Cover Agent"
	},
	{
		dot: 5,
		description: "**Master:** You’re the very last person anyone would suspect."
	}
];

export default {
	label: "Subterfuge",
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
