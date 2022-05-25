import { getTraitDots, getMaxSpend, getAbilitiesCost, getDotsMetaDisplay } from "@/data/_utils";

export const description = "You can understand animals’ behavior patterns. This Skill allows you to predict how an animal might react in a given situation, train a domesticated creature, or even try to calm or enrage animals.";

const dots = [
	{
		dot: 1,
		description: "**Novice:** You can get a domesticated horse to let you pet it."
	},
	{
		dot: 2,
		description: "**Practiced:** You can housebreak a puppy."
	},
	{
		dot: 3,
		description: "**Competent:** You could train a seeing-eye dog."
	},
	{
		dot: 4,
		description: "**Expert:** Circus trainer"
	},
	{
		dot: 5,
		description: "**Master:** You can tame wild beasts without benefit of supernatural powers."
	}
];

export default {
	label: "Animal Ken",
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
