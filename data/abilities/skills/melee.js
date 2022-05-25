import { getTraitDots, getMaxSpend, getAbilitiesCost, getDotsMetaDisplay } from "@/data/_utils";

export const description = "As the Kindred maxim runs, “Guns mean nothing to a lifeless heart”. A blade is often worth far more, as is the skill to use it properly. Melee covers your ability to use hand-to-hand weapons of all forms, from swords and clubs to esoteric martial-arts paraphernalia such as sai or nunchaku. And, of course, there is always the utility of the wooden stake...";

const dots = [
	{
		dot: 1,
		description: "**Novice:** You know the right way to hold a knife."
	},
	{
		dot: 2,
		description: "**Practiced:** You may have been in the occasional street fight."
	},
	{
		dot: 3,
		description: "**Competent:** You could make a college fencing team."
	},
	{
		dot: 4,
		description: "**Expert:** You could keep order in the Prince’s court."
	},
	{
		dot: 5,
		description: "**Master:** Your enemies would rather face a SWAT team than your blade."
	}
];

export default {
	label: "Melee",
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
