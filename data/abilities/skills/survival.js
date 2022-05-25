import { getTraitDots, getMaxSpend, getAbilitiesCost, getDotsMetaDisplay } from "@/data/_utils";

export const description = "Although vampires have little to fear from starvation and exposure, the wilderness can still be dangerous to a Cainite. This Skill allows you to find shelter, navigate your way to civilization, track prey, establish a makeshift haven, and possibly even avoid supernatural threats like werewolves that also prowl the World of Darkness. Note that Survival need not be used only in areas considered “wilderness.” There’s plenty of Survival that goes into getting by in various parts of modern cities.";

const dots = [
	{
		dot: 1,
		description: "**Novice:** You can survive a night spent outside."
	},
	{
		dot: 2,
		description: "**Practiced:** You’ve “roughed it” on a regular basis."
	},
	{
		dot: 3,
		description: "**Competent:** You can separate poison or spoilage from edible forage."
	},
	{
		dot: 4,
		description: "**Expert:** You could live for months in the challenging environment of your choice."
	},
	{
		dot: 5,
		description: "**Master:** You could get dropped naked into the Andes and do all right for yourself."
	}
];

export default {
	label: "Survival",
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
