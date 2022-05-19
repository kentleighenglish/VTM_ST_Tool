import { getTraitDots, getAttributeCost, getMaxSpend } from "@/data/_utils";

export default {
	label: "Stamina",
	type: "dots",
	meta: {
		params: {
			maxDots: getTraitDots,
			maxSpendDots: getMaxSpend(getAttributeCost)
		},
		getXpCost: getAttributeCost,
		description: (name, dotIndex) => {
			let desc = description;

			if (dotIndex) {
				const dotDesc = dots
					.filter(d => d.dot === dotIndex)
					.reduce((acc, dot) => ([
						...acc,
						`\n${dot.description}`
					]), []).join("\n");

				desc += `\n\n${dotDesc}`;
			}

			return desc;
		}
	}
}

const description = "The Stamina Trait reflects a character’s health, toughness, and resilience. It indicates how long a character can exert herself and how much punishment she can withstand before suffering physical trauma. Stamina also includes a bit of psychic fortitude, indicating a character’s grit and tenacity";

const dots = [
	{
		dot: 1,
		description: "<b>Poor:</b> You bruise in a stiff wind"
	},
	{
		dot: 2,
		description: "<b>Average:</b> You are moderately healthy and can take a punch or two"
	},
	{
		dot: 3,
		description: "<b>Good:</b> You are in good shape and rarely fall ill"
	},
	{
		dot: 4,
		description: "<b>Exceptional:</b> You can run — and perhaps win — any marathon you choose"
	},
	{
		dot: 5,
		description: "<b>Outstanding:</b> Your constitution is truly herculean"
	}
];
