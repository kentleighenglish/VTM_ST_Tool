import { getTraitDots, getAttributeCost, getMaxSpend, getDotsMetaDisplay } from "@/data/_utils";

const description = "The Intelligence Attribute refers to a character’s grasp of facts and knowledge. It also governs a character’s ability to reason, solve problems, and evaluate situations. Intelligence also includes critical thinking and flexibility of thought. Intelligence does not include savvy, wisdom, or common sense, as those are properties of the character’s personality, not Traits. Even the smartest character may be too foolish to realize the thugs who want to *“borrow”* her car keys are up to no good. Characters with low Intelligence aren’t necessarily stupid (though they might be); they are just uneducated or simple thinkers. Likewise, characters with high Intelligence aren’t all Einsteins; they may be better at rote memorization or have particularly keen judgment.";

const dots = [
	{
		dot: 1,
		description: "**Poor:** Not the sharpest knife in the drawer."
	},
	{
		dot: 2,
		description: "**Average:** Smart enough to realize you’re normal."
	},
	{
		dot: 3,
		description: "**Good:** More enlightened than the masses."
	},
	{
		dot: 4,
		description: "**Exceptional:** You’re not just bright, you’re downright brilliant"
	},
	{
		dot: 5,
		description: "**Outstanding:** Certified genius."
	}
];

export default {
	label: "Intelligence",
	type: "dots",
	meta: {
		params: {
			maxDots: getTraitDots,
			maxSpendDots: getMaxSpend(getAttributeCost)
		},
		getXpCost: getAttributeCost,
		getMetaDisplay: getDotsMetaDisplay({ dots, description })
	}
}
