
export const movement = {
	type: "custom",
	usedStats: ["dexterity"],
	getOutput: (stats, mods) => {
		let base = 20;

		base += (stats?.dexterity || 0) * 3;

		return `${base} yard${base > 1 ? "s" : ""}`;
	}
}
