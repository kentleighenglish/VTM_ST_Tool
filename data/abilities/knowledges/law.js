import { getTraitDots, getMaxSpend, getAbilitiesCost, getDotsMetaDisplay } from "@/data/_utils";

export const description = "The Law Knowledge represents a knowledge of both legal statutes and proper procedures for enforcing them. Law can be useful for filing suits, avoiding lawsuits, or getting out of jail. What’s more, the Kindred keep their own laws, and more than one vampire has saved his own unlife by deftly exploiting a loophole in one of the Traditions. The Law Knowledge has any number of specialties, and a player may choose one for her character when she takes this Ability, representing both her field of experience and a general sense for how the legal system (especially in her locality) functions, though this is not mandatory.";

const dots = [
	{
		dot: 1,
		description: "**Student:** You’ve paid a traffic ticket and know whether to plead guilty, not guilty, or *nolo contendere* next time."
	},
	{
		dot: 2,
		description: "**College:** You’re either studying for or just passed the bar exam."
	},
	{
		dot: 3,
		description: "**Masters:** You can make a living of the practice, and probably do."
	},
	{
		dot: 4,
		description: "**Doctorate:** If you’re not partner yet, you will be soon."
	},
	{
		dot: 5,
		description: "**Scholar:** You could find the loopholes in the Devil’s contracts."
	}
];

export default {
	label: "Law",
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
