
export const label = "Former Ghoul";

export const type = "social";

export const cost = 1;

export const relatedStats = ["charisma", "manipulation", "appearance"];

export const rollModifier = () => ({
	difficulty: -1,
	pool: 0
});

export const description = "You were introduced to the Blood long before you were made Kindred. Your long experience as a ghoul gives you insight into and comfort with vampiric society. You are at -1 difficulty on all Social rolls when in the presence of other neonates (particularly those who haven’t been educated by their sires), and have a -1 difficulty on all rolls relating to vampiric knowledge.";
