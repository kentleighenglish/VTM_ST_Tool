import { getTraitDots, getAttributeCost, getMaxSpend, getDotsMetaDisplay } from "@/data/_utils";

const description = "Charisma is a character’s ability to entice and please others through her personality. Charisma comes into question when a character tries to win another character’s sympathies or encourage others to trust her. Charisma reflects the power of a character’s charm and influence. It governs a character’s ability to convince others to see her point of view. This Attribute doesn’t necessarily indicate how the character is charismatic, whether she’s a silver-tongued charmer or a grinning bully. (These should come across through roleplaying and specialties.)";

const dots = [
	{
		dot: 1,
		description: "**Poor:** There’s something a little sketchy about you."
	},
	{
		dot: 2,
		description: "**Average:** You are generally likable and have several friends."
	},
	{
		dot: 3,
		description: "**Good:** People trust you implicitly."
	},
	{
		dot: 4,
		description: "**Exceptional:** You have significant personal magnetism."
	},
	{
		dot: 5,
		description: "**Outstanding:** Entire cultures could follow your lead"
	}
];

export default {
	label: "Charisma",
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
