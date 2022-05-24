import { getTraitDots, getAttributeCost, getMaxSpend, getDotsMetaDisplay } from "@/data/_utils";

const description = "The Stamina Trait reflects a character’s health, toughness, and resilience. It indicates how long a character can exert herself and how much punishment she can withstand before suffering physical trauma. Stamina also includes a bit of psychic fortitude, indicating a character’s grit and tenacity";

const dots = [
	{
		dot: 1,
		description: "**Poor:** You bruise in a stiff wind"
	},
	{
		dot: 2,
		description: "**Average:** You are moderately healthy and can take a punch or two"
	},
	{
		dot: 3,
		description: "**Good:** You are in good shape and rarely fall ill"
	},
	{
		dot: 4,
		description: "**Exceptional:** You can run — and perhaps win — any marathon you choose"
	},
	{
		dot: 5,
		description: "**Outstanding:** Your constitution is truly herculean"
	}
];

export default {
	label: "Stamina",
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
