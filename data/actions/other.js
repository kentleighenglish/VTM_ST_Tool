import { rollDice } from "./_utils";

export const initiative = {
	type: "diceRoll",
	usedStats: ["wits", "alertness"],
	getOutput: ({ stats, mods }) => rollDice(stats.wits + stats.alertness)
};

export const customRoll = {
	type: "custom",
	onTrigger: ({ parent }) => parent.openModal("customRollModal")
};
