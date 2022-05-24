import { getTraitDots, getAttributeCost, getMaxSpend, getDotsMetaDisplay } from "@/data/_utils";

const description = "The Dexterity Attribute measures a character’s general physical prowess. It encompasses the character’s speed, agility, and overall quickness, as well as indicating the character’s ability to manipulate objects with control and precision. Also included under Dexterity’s heading are hand-eye coordination, reflexes, and bodily grace.";

const dots = [
	{
		dot: 1,
		description: "**Poor:** You are clumsy and awkward. Put that gun down before you hurt yourself"
	},
	{
		dot: 2,
		description: "**Average:** You’re no clod, but you’re no ballerina, either"
	},
	{
		dot: 3,
		description: "**Good:** You possess some degree of athletic potential"
	},
	{
		dot: 4,
		description: "**Exceptional:** Your movements are liquid and hypnotic — almost superhuman"
	},
	{
		dot: 5,
		description: "**Outstanding:** Your constitution is truly herculean."
	}
];

export default {
	label: "Dexterity",
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
