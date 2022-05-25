import { getTraitDots, getMaxSpend, getAbilitiesCost, getDotsMetaDisplay } from "@/data/_utils";

export const description = "Awareness is an instinctual reaction to the presence of the supernatural. It differs from Alertness (which measures sensitivity to mundane events) and Occult (which covers actual knowledge about the supernatural). Usually, only supernatural creatures have access to this particular Talent, but some unique mortals have a sense that something is strange in the world (such as those with True Faith – see p. 372). Characters with Awareness sometimes get hunches, chills, or sudden flashes of inspiration when they are near supernatural creatures, objects, or events. This insight is purely subconscious, and knowing that something’s wrong doesn’t mean that the character knows what it is. To get more specific information, the Kindred will need to use Occult or a particular power – Awareness only makes the vampire more receptive to the presence of the unusual. A vampire can use Awareness deliberately if he suspects that something is supernatural, but more often the Storyteller can ask for an Awareness roll to determine whether a vampire notices a strange event that’s not immediately visible.";

const dots = [
	{
		dot: 1,
		description: "**Novice:** Once in a while, you get the feeling that something isn’t right."
	},
	{
		dot: 2,
		description: "**Practiced:** You sometimes get strange vibes from a particular direction or vague area (like a building)."
	},
	{
		dot: 3,
		description: "**Competent:** You can walk into a room and know that something unusual is going on within."
	},
	{
		dot: 4,
		description: "**Expert:** If you concentrate, you can sense whether a someone in a group of people or a collection of objects is supernatural."
	},
	{
		dot: 5,
		description: "**Master:** You instinctually know if something or someone is mundane or supernatural."
	}
];

export default {
	label: "Awareness",
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
