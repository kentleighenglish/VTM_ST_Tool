import { getTraitDots, getAttributeCost, getMaxSpend } from "@/data/_utils";

export default {
	label: "Strength",
	type: "dots",
	meta: {
		params: {
			maxDots: getTraitDots,
			maxSpendDots: getMaxSpend(getAttributeCost)
		},
		getXpCost: getAttributeCost,
		getMetaDisplay: ({ value, hoverDot }) => {
			const output = { description }

			if (hoverDot !== null) {
				const currentDot = dots.find(dot => dot.dot === hoverDot);
				if (currentDot) {
					output.system = currentDot.description;
				}

				const xpCost = getAttributeCost(value, hoverDot);

				output.xp = {
					cost: xpCost
				}
			}

			return output;
		}
	}
}

const description = "Strength is the raw, brute power of a character. It governs how much weight a character can lift, how much he can physically push, and how hard he can hit another character or object. The Strength Trait is added to a character’s damage dice pool when he hits his opponent in hand-to-hand combat. It is also used when a character wishes to break, lift, or carry something, as well as when a character tries to jump a distance.";

const dots = [
	{
		dot: 1,
		description: "**Poor:** You can lift 40 lbs (about 20 kgs)"
	},
	{
		dot: 2,
		description: "**Average:** You can lift 100 lbs (close to 50 kgs)."
	},
	{
		dot: 3,
		description: "**Good:** You can lift 250 lbs (a little over 100 kgs)"
	},
	{
		dot: 4,
		description: "**Exceptional:** You can lift 400 lbs (close to 200 kgs)"
	},
	{
		dot: 5,
		description: "**Outstanding:** You can lift 650 lbs (nearly 300 kgs) and crush skulls like grapes"
	}
];
