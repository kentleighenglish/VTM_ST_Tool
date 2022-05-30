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

export const climbing = {
	type: "diceRoll",
	usedStats: ["dexterity", "athletics"],
	getOutput: (stats) => {
		return rollDice(stats.dexterity + stats.athletics);
	}
}

export const driving = {
	type: "diceRoll",
	usedStats: ["dexterity", "drive"],
	getOutput: (stats) => {
		return rollDice(stats.dexterity + stats.drive);
	}
}

export const drivingQuick = {
	type: "diceRoll",
	usedStats: ["wits", "drive"],
	getOutput: (stats) => {
		return rollDice(stats.wits + stats.drive);
	}
}

export const hunting = {
	type: "diceRoll",
	usedStats: ["perception", "survival"],
	getOutput: (stats) => {
		return rollDice(stats.perception + stats.survival);
	}
}

export const featOfStrength = {
	type: "diceRoll",
	usedStats: ["willpower"],
	getOutput: (stats) => {
		return rollDice(stats.willpower);
	}
}

export const breakingAndEntering = {
	type: "diceRoll",
	usedStats: ["dexterity", "larceny"],
	getOutput: (stats) => {
		return rollDice(stats.dexterity + stats.larceny);
	}
}

export const securityIntrusion = {
	type: "diceRoll",
	usedStats: ["intelligence", "larceny"],
	getOutput: (stats) => {
		return rollDice(stats.intelligence + stats.technology);
	}
}

export const standingJump = {
	type: "diceRoll",
	usedStats: ["strength"],
	getOutput: (stats) => {
		return rollDice(stats.strength);
	}
}

export const runningJump = {
	type: "diceRoll",
	usedStats: ["strength", "athletics"],
	getOutput: (stats) => {
		return rollDice(stats.strength + stats.athletics);
	}
}

export const longRunning = {
	type: "diceRoll",
	usedStats: ["stamina", "athletics"],
	getOutput: (stats) => {
		return rollDice(stats.stamina + stats.athletics);
	}
}

export const forceOpen = {
	type: "diceRoll",
	usedStats: ["strength"],
	getOutput: (stats) => {
		return rollDice(stats.strength);
	}
}

export const pursuit = {
	type: "diceRoll",
	usedStats: ["dexterity", "athletics"],
	getOutput: (stats) => {
		return rollDice(stats.dexterity + stats.athletics);
	}
}

export const vehiclePursuit = {
	type: "diceRoll",
	usedStats: ["dexterity", "drive"],
	getOutput: (stats) => {
		return rollDice(stats.dexterity + stats.drive);
	}
}

export const shadowing = {
	type: "diceRoll",
	usedStats: ["dexterity", "stealth"],
	getOutput: (stats) => {
		return rollDice(stats.dexterity + stats.stealth);
	}
}

export const vehicleShadowing = {
	type: "diceRoll",
	usedStats: ["dexterity", "drive"],
	getOutput: (stats) => {
		return rollDice(stats.dexterity + stats.drive);
	}
}

export const sneaking = {
	type: "diceRoll",
	usedStats: ["stamina", "stealth"],
	getOutput: (stats) => {
		return rollDice(stats.stamina + stats.stealth);
	}
}

export const swimming = {
	type: "diceRoll",
	usedStats: ["dexterity", "athletics"],
	getOutput: (stats) => {
		return rollDice(stats.dexterity + stats.athletics);
	}
}

export const throwing = {
	type: "diceRoll",
	usedStats: ["dexterity", "athletics"],
	getOutput: (stats) => {
		return rollDice(stats.dexterity + stats.athletics);
	}
}
