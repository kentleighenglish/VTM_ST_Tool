
export const label = "Natural Linguist";

export const type = "mental";

export const cost = 2;

export const relatedStats = ["charisma", "manipulation", "craft"];

export const rollModifier = () => ({
	difficulty: 0,
	pool: 3
});

export const description = "You have a flair for languages. You may add three dice to any dice pool involving written or spoken languages, and each purchase of the Language Merit (previous page) gives you two languages instead of just one.";
