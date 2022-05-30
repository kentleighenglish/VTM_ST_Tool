import { rollDice } from "./_utils";

export const carousing = {
	type: "diceRoll",
	usedStats: ["charisma", "empathy"],
	getOutput: (stats, mods) => rollDice(stats.charisma + stats.empathy)
}

export const credibility = {
	type: "diceRoll",
	usedStats: ["manipulation", "perception"],
	getOutput: (stats, mods) => rollDice(stats.manipulation + stats.perception)
}

export const fastTalk = {
	type: "diceRoll",
	usedStats: ["manipulation", "subterfuge"],
	getOutput: (stats, mods) => rollDice(stats.manipulation + stats.subterfuge)
}

export const softInterrogation = {
	type: "diceRoll",
	usedStats: ["manipulation", "empathy"],
	getOutput: (stats, mods) => rollDice(stats.manipulation + stats.empathy)
}

export const violentInterrogation = {
	type: "diceRoll",
	usedStats: ["manipulation", "intimidation"],
	getOutput: (stats, mods) => rollDice(stats.manipulation + stats.intimidation)
}

export const subtleIntimidation = {
	type: "diceRoll",
	usedStats: ["manipulation", "intimidation"],
	getOutput: (stats, mods) => rollDice(stats.manipulation + stats.intimidation)
}

export const directIntimidation = {
	type: "diceRoll",
	usedStats: ["strength", "intimidation"],
	getOutput: (stats, mods) => rollDice(stats.strength + stats.intimidation)
}

export const oration = {
	type: "diceRoll",
	usedStats: ["charisma", "leadership"],
	getOutput: (stats, mods) => rollDice(stats.charisma + stats.leadership)
}

export const performance = {
	type: "diceRoll",
	usedStats: ["charisma", "performance"],
	getOutput: (stats, mods) => rollDice(stats.charisma + stats.performance)
}
