import { getTraitDots, getMaxSpend, getAbilitiesCost, getDotsMetaDisplay } from "@/data/_utils";

export const description = "The Performance Skill governs your ability to perform artistic endeavors such as singing, dancing, acting, or playing a musical instrument. You are almost certainly specialized in one field, although true virtuosos may be talented in many forms of performance. This Skill represents not only technical know-how, but the ability to work an audience and enrapture them with your show. As with Crafts, you must choose a specialty, even though this Skill also imparts a general sense for watching and responding to your audience’s mood regardless of medium.";

const dots = [
	{
		dot: 1,
		description: "**Novice:** You could sing in the church choir."
	},
	{
		dot: 2,
		description: "**Practiced:** Your Internet videos have over a hundred thousand views."
	},
	{
		dot: 3,
		description: "**Competent:** You almost always have a gig booked."
	},
	{
		dot: 4,
		description: "**Expert:** You have the talent to be a national sensation."
	},
	{
		dot: 5,
		description: "**Master:** You are a virtuoso without peer."
	}
];

export default {
	label: "Performance",
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
