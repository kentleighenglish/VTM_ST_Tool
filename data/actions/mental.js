import { rollDice } from "./_utils";

export const tracking = {
	type: "diceRoll",
	usedStats: ["perception", "investigation"],
	getOutput: (stats, mods) => rollDice(stats.perception + stats.investigation)
}
