import { getTraitDots, getMaxSpend, getAbilitiesCost, getDotsMetaDisplay } from "@/data/_utils";

export const description = "This Knowledge represents the ability to operate and program computers, including mobile devices. Most Computer use also imparts a degree of Internet awareness (if not savvy).";

const dots = [
	{
		dot: 1,
		description: "**Student:** You can navigate touch-screen and traditional point-and-click GUIs."
	},
	{
		dot: 2,
		description: "**College:** You know your way around various applications and the Internet."
	},
	{
		dot: 3,
		description: "**Masters:** You know what to do with a text command prompt."
	},
	{
		dot: 4,
		description: "**Doctorate:** You can make a very comfortable living as a consultant."
	},
	{
		dot: 5,
		description: "**Scholar:** You have all the SDKs and comprehend data structures for a stunning variety of programming languages."
	}
];

export default {
	label: "Computer",
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
