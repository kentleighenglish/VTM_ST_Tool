import { getTraitDots, getMaxSpend, getAbilitiesCost, getDotsMetaDisplay } from "@/data/_utils";

export const description = "This is your basic knack for noticing things that go on around you, even when you’re not actively looking for them. Alertness describes the attention you pay to the outside world, whether otherwise occupied or not. This Talent is typically paired with Perception, and is best used when sensing physical stimuli (as opposed to moods or clues).";

const dots = [
	{
		dot: 1,
		description: "**Novice:** You’re no mindless drone."
	},
	{
		dot: 2,
		description: "**Practiced:** Habitual eavesdropper"
	},
	{
		dot: 3,
		description: "**Competent:** You keep a sharp eye on your surroundings."
	},
	{
		dot: 4,
		description: "**Expert:** Whether from paranoia or good sense, you are rarely caught off-guard."
	},
	{
		dot: 5,
		description: "**Master:** Your senses are on par with those of a wild animal."
	}
];

export default {
	label: "Alertness",
	type: "dots",
	meta: {
		params: {
			maxDots: getTraitDots,
			maxSpendDots: getMaxSpend(getAbilitiesCost)
		},
		getXpCost: getAbilitiesCost,
		getMetaDisplay: getDotsMetaDisplay({ dots, description })
	}
};
