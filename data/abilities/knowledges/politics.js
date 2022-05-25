import { getTraitDots, getMaxSpend, getAbilitiesCost, getDotsMetaDisplay } from "@/data/_utils";

export const description = "You are familiar with the politics of the moment, including the people in charge and how they got there. This Knowledge can aid you in dealing with or influencing mortal politicians, or even offer some insight into the local Cainite power structure. The Politics Knowledge includes the ability to practically navigate various bureaucracies, as it assumes that certain organizational structures and relationship currencies are universal.";

const dots = [
	{
		dot: 1,
		description: "**Student:** Activist; you can pay a speeding ticket online."
	},
	{
		dot: 2,
		description: "**College:** Political science major; you know how to file a request for information."
	},
	{
		dot: 3,
		description: "**Masters:** Campaign manager or talk-radio host; the clerk will help you navigate the forms you need to complete and tell you who needs the duplicates."
	},
	{
		dot: 4,
		description: "**Doctorate:** Senator; *“We’re not supposed to show this to anyone without press credentials, so don’t quote me.”*"
	},
	{
		dot: 5,
		description: "**Scholar:** You could choose the next President of the United States. *“Sure, here are the keys to the file morgue. Turn off the light when you leave.”*"
	}
];

export default {
	label: "Politics",
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
