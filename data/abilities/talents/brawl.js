import { getTraitDots, getMaxSpend, getAbilitiesCost, getDotsMetaDisplay } from "@/data/_utils";

export const description = "The Brawl Talent represents how well you fight in tooth-and-nail situations. This Talent represents skill in unarmed combat, whether from formal martial arts training or simply from plenty of experience. Effective brawlers are coordinated, resistant to pain, quick, strong, and mean. The willingness to do whatever it takes to hurt your opponent wins plenty of fights.";

const dots = [
	{
		dot: 1,
		description: "**Novice:** You were picked on as a kid."
	},
	{
		dot: 2,
		description: "**Practiced:** You’ve participated in the occasional barroom tussle."
	},
	{
		dot: 3,
		description: "**Competent:** You’ve fought regularly and routinely, and generally walked away in better shape than your opponents."
	},
	{
		dot: 4,
		description: "**Expert:** You could be a serious contender on the MMA circuit."
	},
	{
		dot: 5,
		description: "**Master:** Somewhere on the Internet, there’s a video of you taking down three men in four seconds."
	}
];

export default {
	label: "Brawl",
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
