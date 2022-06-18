
export const label = "Glowing Eyes";

export const type = "physical";

export const cost = -3;

export const relatedStats = ["intimidation", "perception", "firearms", "stealth"];

export const rollModifier = () => ({
	difficulty: -1,
	pool: 0
});

// @todo dynamic difficulties based on stats
export const description = "You have the stereotypical glowing eyes of vampire legend, which gives you a -1 difficulty on Intimidation rolls when you’re dealing with mortals. However, the tradeoffs are many; you must constantly disguise your condition (no, contacts don’t cut it); the glow impairs your vision and puts you at +1 difficulty on all sight-based rolls (including the use of ranged weapons); and the radiance emanating from your eye sockets makes it difficult to hide (+2 difficulty to Stealth rolls) in the dark.";
