import { getTraitDots, getMaxSpend, getAbilitiesCost, getDotsMetaDisplay } from "@/data/_utils";

export const description = "The Technology Knowledge represents a broad acumen with electronics, computer hardware, and devices more elaborate than “machines,” which fall under the Crafts Skill. If it has a processor, a transistor, or an integrated circuit — if it’s electronic rather than electrical — manipulating it uses the Technology Knowledge. This is the wide-ranging Ability used to build one’s own computer, install (or subvert) a security system, repair a mobile phone, or kitbash a shortwave radio. You must always choose a specialization in Technology, even though you possess some skill in multiple fields. ";

const dots = [
	{
		dot: 1,
		description: "**Student:** You can perform simple modifications or repairs."
	},
	{
		dot: 2,
		description: "**College:** You could make your living in assembly or repair."
	},
	{
		dot: 3,
		description: "**Masters:** You can design new technologies from a set of objective requirements."
	},
	{
		dot: 4,
		description: "**Doctorate:** For you, it’s not, *“Can this be done?”* but *“How can this be done?”*"
	},
	{
		dot: 5,
		description: "**Scholar:** A visionary in the field; you shape how people interact with their world through devices."
	}
];

export default {
	label: "Technology",
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
