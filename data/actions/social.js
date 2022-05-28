import { rollDice } from "./_utils";

export const directIntimidation = {
	type: "diceRoll",
	usedStats: ["strength", "intimidation"],
	getOutput: (stats, mods) => rollDice(stats.strength + stats.intimidation)
}
