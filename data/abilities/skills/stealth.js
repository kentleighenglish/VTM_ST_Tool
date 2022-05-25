import { getTraitDots, getMaxSpend, getAbilitiesCost, getDotsMetaDisplay } from "@/data/_utils";

export const description = "This Skill is the ability to avoid being detected, whether you’re hiding or moving at the time. Stealth is often tested against someone else’s Perception + Alertness. This Ability is, for obvious reasons, highly useful in stalking prey. In many cases, Stealth is also used to conceal items, whether on one’s person or somewhere in the environment.";

const dots = [
	{
		dot: 1,
		description: "**Novice:** You can hide in a darkened room."
	},
	{
		dot: 2,
		description: "**Practiced:** You can shadow someone from streetlight to streetlight."
	},
	{
		dot: 3,
		description: "**Competent:** You have little difficulty finding prey from evening to evening."
	},
	{
		dot: 4,
		description: "**Expert:** You can move quietly over dry leaves."
	},
	{
		dot: 5,
		description: "**Master:** Nosferatu elder"
	}
];

export default {
	label: "Stealth",
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
