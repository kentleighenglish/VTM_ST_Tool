import { getTraitDots, getMaxSpend, getAbilitiesCost, getDotsMetaDisplay } from "@/data/_utils";

export const description = "You’ve learned to notice details others might overlook, and might make an admirable detective. This Knowledge represents not only a good eye for detail, but also an ability to do research and follow leads. Such research may include Internet searches or more specific research techniques like hitting the law books and periodicals archives at the library.";

const dots = [
	{
		dot: 1,
		description: "**Student:** You can parse a broad Web search for clues."
	},
	{
		dot: 2,
		description: "**College:** Police officer"
	},
	{
		dot: 3,
		description: "**Masters:** Private detective"
	},
	{
		dot: 4,
		description: "**Doctorate:** Federal Agent"
	},
	{
		dot: 5,
		description: "**Scholar:** Sherlock Holmes"
	}
];

export default {
	label: "Investigation",
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
