import { rollDice } from "./_utils";

export const movement = {
	type: "custom",
	usedStats: ["dexterity"],
	getOutput: (stats, mods) => {
		let base = 20;

		base += (stats.dexterity || 0) * 3;

		return `${base} yard${base > 1 ? "s" : ""}`;
	}
}

export const soak = {
	type: "diceRoll",
	usedStats: ["stamina", "fortitude"],
	getOutput: (stats) => {
		return rollDice(stats.stamina + stats.fortitude);
	}
}

export const dodge = {
	type: "diceRoll",
	usedStats: ["stamina", "athletics"],
	getOutput: (stats) => {
		return rollDice(stats.stamina + stats.athletics);
	}
}
