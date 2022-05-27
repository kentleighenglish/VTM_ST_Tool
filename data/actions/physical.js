
export const movement = {
	usedStats: ["dexterity"],
	roll: (stats, mods) => {
		let base = 20;

		base += (stats?.dexterity || 0) * 3;

		return base;
	}
}
