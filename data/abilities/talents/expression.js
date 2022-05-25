import { getTraitDots, getMaxSpend, getAbilitiesCost, getDotsMetaDisplay } from "@/data/_utils";

export const description = "This is your ability to get your point across clearly, whether through conversation, poetry, or even in 140 characters or fewer. Characters with high Expression can phrase their opinions or beliefs in a manner that cannot be ignored (even if their opinions are misinformed or worthless). They might also be talented actors, skilled at conveying moods or communicating emotion with every gesture. Additionally, this Talent represents your ability for poetry, creative writing, or other literary art forms. For many elders, Expression is the subtle art of crafting a satirical epigram capable of socially crippling one’s longtime rival. For younger Kindred, Expression may well be the key to convincing thirty stake-wielding Anarchs to converge on the Sheriff’s private hunting ground with the right text message. You can choose a specialty in Expression, even at less than 4 dots.";

const dots = [
	{
		dot: 1,
		description: "**Novice:** Your talent has matured past crude poetry on notebook paper."
	},
	{
		dot: 2,
		description: "**Practiced:** You could lead a college debate team."
	},
	{
		dot: 3,
		description: "**Competent:** You could be a successful writer."
	},
	{
		dot: 4,
		description: "**Expert:** Your work is Pulitzer material."
	},
	{
		dot: 5,
		description: "**Master:** Steve Jobs asks you for input on his next mobile device."
	}
];

export default {
	label: "Expression",
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
