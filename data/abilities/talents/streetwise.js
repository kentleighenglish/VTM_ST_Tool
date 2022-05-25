import { getTraitDots, getMaxSpend, getAbilitiesCost, getDotsMetaDisplay } from "@/data/_utils";

export const description = "The streets can provide a lot of information or money to those who know the language. Streetwise allows you to blend in unobtrusively with the local scene, pick up gossip, understand slang, or even dabble in criminal doings.";

const dots = [
	{
		dot: 1,
		description: "**Novice:** You know who’s holding."
	},
	{
		dot: 2,
		description: "**Practiced:** You’re accorded respect on the street."
	},
	{
		dot: 3,
		description: "**Competent:** You could head your own gang."
	},
	{
		dot: 4,
		description: "**Expert:** You have little to fear in even the worst neighborhoods."
	},
	{
		dot: 5,
		description: "**Master:** If you haven’t heard it, it hasn’t been said."
	}
];

export default {
	label: "Streetwise",
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
