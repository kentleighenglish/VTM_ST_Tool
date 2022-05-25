import { getTraitDots, getMaxSpend, getAbilitiesCost, getDotsMetaDisplay } from "@/data/_utils";

export const description = "You know the ins and outs of commerce, from evaluating an item’s relative worth to keeping up with currency exchange rates. This Knowledge can be invaluable when brokering items, running numbers, or playing the stock market. Sufficiently high levels in Finance allow you to raise your standards of living to a very comfortable level.";

const dots = [
	{
		dot: 1,
		description: "**Student:** You’ve taken a few business classes."
	},
	{
		dot: 2,
		description: "**College:** You have some practical experience and can keep your books fairly neat."
	},
	{
		dot: 3,
		description: "**Masters:** You’d make a fine stockbroker."
	},
	{
		dot: 4,
		description: "**Doctorate:** Corporations follow your financial lead."
	},
	{
		dot: 5,
		description: "**Scholar:** You could turn a $20 bill into a fortune."
	}
];

export default {
	label: "Finance",
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
