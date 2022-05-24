import { getTraitDots, getAttributeCost, getMaxSpend, getDotsMetaDisplay } from "@/data/_utils";

const description = "Perception measures a character’s ability to observe his environment. This may involve a conscious effort, such as searching an area, but it is more often intuitive, as the character’s keen senses notice something out of the ordinary. Perception is a sensitivity to one’s surroundings, and is seldom present in the cynical or jaded (who have seen it all before). Perception is used to determine whether or not a character understands a given situation or detects an environmental stimulus. It can warn a character of ambushes, distinguish a clue from a pile of refuse, or uncover any other hidden or overlookable detail, whether physical or otherwise.";

const dots = [
	{
		dot: 1,
		description: "**Poor:** Perhaps you are absurdly self-absorbed, perhaps merely an airhead.In any event, *watch out for that car!*"
	},
	{
		dot: 2,
		description: "**Average:** The very subtle evades you, but you’re aware of the bigger picture."
	},
	{
		dot: 3,
		description: "**Good:** You perceive moods, textures, and small changes in your environment."
	},
	{
		dot: 4,
		description: "**Exceptional:** Almost nothing escapes your notice."
	},
	{
		dot: 5,
		description: "**Outstanding:** You instantly observe things almost imperceptible to human senses."
	}
];

export default {
	label: "Perception",
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
