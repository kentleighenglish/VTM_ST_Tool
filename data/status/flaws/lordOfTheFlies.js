
export const label = "Lord of the Flies";

export const type = "supernatural";

export const cost = -2;

export const relatedStats = ["stealth"];

export const rollModifier = () => ({
	difficulty: 2,
	pool: 0
});

// @todo dynamic difficulty
export const description = "Buzzing harbingers of decay swirl around you everywhere. Their constant presence makes it difficult for you to interact socially (+1 difficulty when appropriate) and nearly impossible to sneak up on someoneor hide effectively. The buzzing of the flies inevitably gives you away — all Stealth rolls are at +2 difficulty.";
