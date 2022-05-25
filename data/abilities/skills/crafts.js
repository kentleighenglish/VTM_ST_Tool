import { getTraitDots, getMaxSpend, getAbilitiesCost, getDotsMetaDisplay } from "@/data/_utils";

export const description = "This Skill covers your ability to make or fix things with your hands. Crafts allows you to work in fields such as carpentry, leatherworking, weaving, or even mechanical expertise such as car repair. You can even create lasting works of art with this Skill, depending on the number of successes you achieve. You must always choose a specialization in Crafts, even though you retain some skill in multiple fields.";

const dots = [
	{
		dot: 1,
		description: "**Novice:** High school wood shop"
	},
	{
		dot: 2,
		description: "**Practiced:** You’re starting to develop your own style"
	},
	{
		dot: 3,
		description: "**Competent:** You could start your own shop."
	},
	{
		dot: 4,
		description: "**Expert:** You wrote instruction manuals on your field of specialization."
	},
	{
		dot: 5,
		description: "**Master:** Your craftsmanship and insight is virtually without peer."
	}
];

export default {
	label: "Crafts",
	type: "dots",
	meta: {
		params: {
			maxDots: getTraitDots,
			maxSpendDots: getMaxSpend(getAbilitiesCost)
		},
		getXpCost: getAbilitiesCost,
		getMetaDisplay: getDotsMetaDisplay({ dots, description })
	}
}
