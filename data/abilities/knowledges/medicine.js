import { getTraitDots, getMaxSpend, getAbilitiesCost, getDotsMetaDisplay } from "@/data/_utils";

export const description = "You have an understanding of how the human body — and to a lesser extent the vampiric body — works. This Ability covers knowledge of medicines, ailments, first-aid procedures, and diagnosis or treatment of disease. Medicine is of great use to those Kindred with an interest in repairing, damaging, or reworking the human body.";

const dots = [
	{
		dot: 1,
		description: "**Student:** You’ve taken a CPR course."
	},
	{
		dot: 2,
		description: "**College:** Premed or paramedic"
	},
	{
		dot: 3,
		description: "**Masters:** General practitioner"
	},
	{
		dot: 4,
		description: "**Doctorate:** You can perform transplants."
	},
	{
		dot: 5,
		description: "**Scholar:** You are respected by the world’s medical community as a pioneer."
	}
];

export default {
	label: "Medicine",
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
