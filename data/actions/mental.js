import { rollDice } from "./_utils";

export const awakening = {
	type: "diceRoll",
	usedStats: ["perception", "humanity"],
	getOutput: ({ stats, mods }) => rollDice(stats.perception + stats.humanity)
}

export const useComputer = {
	type: "diceRoll",
	usedStats: ["intelligence", "computer"],
	getOutput: ({ stats, mods }) => rollDice(stats.intelligence + stats.computer)
}

export const investigation = {
	type: "diceRoll",
	usedStats: ["perception", "investigation"],
	getOutput: ({ stats, mods }) => rollDice(stats.perception + stats.investigation)
}

export const repair = {
	type: "diceRoll",
	usedStats: ["perception", "crafts"],
	getOutput: ({ stats, mods }) => rollDice(stats.perception + stats.crafts)
}

export const researchAcademics = {
	type: "diceRoll",
	usedStats: ["intelligence", "academics"],
	getOutput: ({ stats, mods }) => rollDice(stats.intelligence + stats.academics)
}

export const researchOccult = {
	type: "diceRoll",
	usedStats: ["intelligence", "occult"],
	getOutput: ({ stats, mods }) => rollDice(stats.intelligence + stats.occult)
}

export const researchScience = {
	type: "diceRoll",
	usedStats: ["intelligence", "science"],
	getOutput: ({ stats, mods }) => rollDice(stats.intelligence + stats.science)
}

export const tracking = {
	type: "diceRoll",
	usedStats: ["perception", "survival"],
	getOutput: ({ stats, mods }) => rollDice(stats.perception + stats.survival)
}
