import { getTraitDots, getMaxSpend, getAbilitiesCost, getDotsMetaDisplay } from "@/data/_utils";

export const description = "You are an example to others and can inspire them to do what you want. Leadership has less to do with manipulating people’s desires than it does with presenting yourself as the sort of person they want to follow. Anyone can lead a group into some sort of conflict; a good leader can get them back out intact. This Talent is usually paired with Charisma rather than Manipulation";

const dots = [
	{
		dot: 1,
		description: "**Novice:** Captain of your Little League team"
	},
	{
		dot: 2,
		description: "**Practiced:** Student body president"
	},
	{
		dot: 3,
		description: "**Competent:** An effective CEO"
	},
	{
		dot: 4,
		description: "**Expert:** Presidential material"
	},
	{
		dot: 5,
		description: "**Master:** You could be beloved dictator of a nation."
	}
];

export default {
	label: "Leadership",
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
