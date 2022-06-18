
export const label = "Lunacy";

export const type = "mental";

export const cost = -2;

export const relatedStats = [];

export const rollModifier = () => ({
	difficulty: 2,
	pool: 0
});

// @todo dynamic difficulty
export const description = "You are affected by the phases of the moon, increasing your chances to frenzy. Under the crescent moon,difficulties to avoid frenzy increase by one. Under the half or gibbous moon, difficulties rise by two. When the moon is full, difficulties increase by three.";
