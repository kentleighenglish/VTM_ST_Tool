import { getTraitDots, getMaxSpend, getAbilitiesCost, getDotsMetaDisplay } from "@/data/_utils";

export const description = "This catchall Knowledge covers the character’s erudition in the humanities: literature, history, art, philosophy, and other “liberal” arts and sciences. A character with dots in Academics is generally well rounded in these fields, and at high levels may be considered an expert in one or more areas of study. Not only can this Knowledge impress at salons and other Elysium functions, but it can also offer valuable clues to certain past — and future — movements in the Jyhad. If you like, you can choose a specialty for Academics even at less than 4 dots.";

const dots = [
	{
		dot: 1,
		description: "**Student:** You’re aware that 1066 isn’t a Beverly Hills area code."
	},
	{
		dot: 2,
		description: "**College:** You can quote from the classics, identify major cultural movements, and expound on the difference between Ming and Moghul."
	},
	{
		dot: 3,
		description: "**Masters:** You could get a paper published in a scholarly journal."
	},
	{
		dot: 4,
		description: "**Doctorate:** Professor emeritus"
	},
	{
		dot: 5,
		description: "**Scholar:** Scholars worldwide acknowledge you as one of the foremost experts of your time."
	}
];

export default {
	label: "Academics",
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
