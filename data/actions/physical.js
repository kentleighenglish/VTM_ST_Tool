export const movement = {
	type: "custom",
	rollStats: ["dexterity"],
	getOutput: ({ stats, mods }) => {
		let base = 20;

		base += (stats.dexterity || 0) * 3;

		return `${base} yard${base > 1 ? "s" : ""}`;
	}
}

export const soak = {
	type: "diceRoll",
	rollStats: ["stamina", "fortitude"]
}

export const dodge = {
	type: "diceRoll",
	rollStats: ["stamina", "athletics"]
}

export const climbing = {
	type: "diceRoll",
	rollStats: ["dexterity", "athletics"]
}

export const driving = {
	type: "diceRoll",
	rollStats: ["dexterity", "drive"]
}

export const drivingQuick = {
	type: "diceRoll",
	rollStats: ["wits", "drive"]
}

export const hunting = {
	type: "diceRoll",
	rollStats: ["perception", "survival"]
}

export const featOfStrength = {
	type: "diceRoll",
	rollStats: ["willpower"]
}

export const breakingAndEntering = {
	type: "diceRoll",
	rollStats: ["dexterity", "larceny"]
}

export const securityIntrusion = {
	type: "diceRoll",
	rollStats: ["intelligence", "larceny"]
}

export const standingJump = {
	type: "diceRoll",
	rollStats: ["strength"]
}

export const runningJump = {
	type: "diceRoll",
	rollStats: ["strength", "athletics"]
}

export const longRunning = {
	type: "diceRoll",
	rollStats: ["stamina", "athletics"]
}

export const forceOpen = {
	type: "diceRoll",
	rollStats: ["strength"]
}

export const pursuit = {
	type: "diceRoll",
	rollStats: ["dexterity", "athletics"]
}

export const vehiclePursuit = {
	type: "diceRoll",
	rollStats: ["dexterity", "drive"]
}

export const shadowing = {
	type: "diceRoll",
	rollStats: ["dexterity", "stealth"]
}

export const vehicleShadowing = {
	type: "diceRoll",
	rollStats: ["dexterity", "drive"]
}

export const sneaking = {
	type: "diceRoll",
	rollStats: ["stamina", "stealth"]
}

export const swimming = {
	type: "diceRoll",
	rollStats: ["dexterity", "athletics"]
}

export const throwing = {
	type: "diceRoll",
	rollStats: ["dexterity", "athletics"]
}
