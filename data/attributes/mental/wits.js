import { getTraitDots, getAttributeCost, getMaxSpend, getDotsMetaDisplay } from "@/data/_utils";

const description = "The Wits Trait measures the character’s ability to think on her feet and react quickly to a certain situation. It also reflects a character’s general cleverness. Characters with low Wits ratings are thick and mentally lethargic, or maybe gullible and unsophisticated. By contrast, characters with high Wits Traits almost always have a plan immediately and adapt to their surroundings with striking expedience. Characters with high Wits also manage to keep their cool in stressful situations.";

const dots = [
	{
		dot: 1,
		description: "**Poor:** Pull my finger."
	},
	{
		dot: 2,
		description: "**Average:** You know when to bet or fold in poker."
	},
	{
		dot: 3,
		description: "**Good:** You are seldom surprised or left speechless."
	},
	{
		dot: 4,
		description: "**Exceptional:** You’re one of the people who make others think, *“Ooh, I should have said...”* the next day."
	},
	{
		dot: 5,
		description: "**Outstanding:** Outstanding: You think and respond almost more quickly than you can act."
	}
];

export default {
	label: "Wits",
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
