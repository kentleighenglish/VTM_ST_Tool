
export const label = "Slow Healing";

export const type = "physical";

export const cost = -3;

export const relatedStats = [];

export const rollModifier = () => ({
	difficulty: 0,
	pool: 0
});

export const description = "You have difficulty healing wounds. It requires two blood points to heal one health level of bashing or lethal damage, and you heal one health level of aggravated damage every five days (plus the usual five bloodpoints and Willpower expenditure).";
