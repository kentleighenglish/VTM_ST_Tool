import { getTraitDots, getMaxSpend, getAbilitiesCost, getDotsMetaDisplay } from "@/data/_utils";

export const description = "You are knowledgeable in occult areas such as mysticism, curses, magic, folklore, and particularly vampire lore. Unlike most other Knowledges, Occult does not imply a command of hard facts. Much of what you know may well be rumor, myth, speculation, or hearsay. However, the secrets to be learned in this field are worth centuries of sifting legend from fact. High levels of Occult imply a deep understanding of vampire lore, as well as a good grounding in other aspects of the occult. At the very least, you can discern what is patently false.";

const dots = [
	{
		dot: 1,
		description: "**Student:** You’ve got a blog about the eerie and the disturbing."
	},
	{
		dot: 2,
		description: "**College:** There seems to be some unsettling truth to some of the rumors you’ve heard."
	},
	{
		dot: 3,
		description: "**Masters:** You’ve heard a lot and actually seen a little for yourself."
	},
	{
		dot: 4,
		description: "**Doctorate:** You can recognize blatantly false sources and make educated guesses about the rest."
	},
	{
		dot: 5,
		description: "**Scholar:** You know most of the basic truths about the hidden world."
	}
];

export default {
	label: "Occult",
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
