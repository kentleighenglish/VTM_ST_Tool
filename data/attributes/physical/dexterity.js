import { calculateTraitRating } from "@/data/_utils";

export default {
	label: "Dexterity",
	type: "dots",
	meta: {
		params: {
			maxDots: calculateTraitRating
		},
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

const description = "The Dexterity Attribute measures a character’s general physical prowess. It encompasses the character’s speed, agility, and overall quickness, as well as indicating the character’s ability to manipulate objects with control and precision. Also included under Dexterity’s heading are hand-eye coordination, reflexes, and bodily grace.";

const dots = [
	{
		dot: 1,
		description: "<b>Poor:</b> You are clumsy and awkward. Put that gun down before you hurt yourself"
	},
	{
		dot: 2,
		description: "<b>Average:</b> You’re no clod, but you’re no ballerina, either"
	},
	{
		dot: 3,
		description: "<b>Good:</b> You possess some degree of athletic potential"
	},
	{
		dot: 4,
		description: "<b>Exceptional:</b> Your movements are liquid and hypnotic — almost superhuman"
	},
	{
		dot: 5,
		description: "<b>Outstanding:</b> You can lift 650 lbs (nearly 300 kgs) and crush skulls like grapes"
	}
];
