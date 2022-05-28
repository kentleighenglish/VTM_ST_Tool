
export const movement = {
	usedStats: ["dexterity"],
	getDicePool: (stats, mods) => {
		let base = 20;

		base += (stats?.dexterity || 0) * 3;

		return base;
	}
}
