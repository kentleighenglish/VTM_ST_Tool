
export const directIntimidation = {
	usedStats: ["strength", "intimidation"],
	getDicePool: (stats, mods) => stats.strength + stats.intimidation
}
