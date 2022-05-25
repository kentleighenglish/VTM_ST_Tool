import { getTraitDots, getMaxSpend, getAbilitiesCost, getDotsMetaDisplay } from "@/data/_utils";

export const description = "You can drive a car, and maybe other vehicles as well. This Skill does not automatically entail familiarity with complicated vehicles such as tanks or 18-wheelers, and difficulties may vary depending on your experience with individual automobiles. After all, helming a station wagon doesn’t prepare you for double-clutching a Maserati at 100 miles per hour.";

const dots = [
	{
		dot: 1,
		description: "**Novice:** You know how to work an automatic transmission."
	},
	{
		dot: 2,
		description: "**Practiced:** You can drive a stick shift."
	},
	{
		dot: 3,
		description: "**Competent:** Professional trucker"
	},
	{
		dot: 4,
		description: "**Expert:** NASCAR daredevil or tank pilot."
	},
	{
		dot: 5,
		description: "**Master:** Whether it’s a Fiat or a Ferrari, you can make it sing."
	}
];

export default {
	label: "Drive",
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
