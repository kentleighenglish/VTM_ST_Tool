
export const label = "Coldly Logical";

export const type = "mental";

export const cost = 1;

export const relatedStats = ["intelligence", "wits", "perception"];

export const rollModifier = () => ({
	difficulty: -1,
	pool: 0
});

export const description = "While some might refer to you as a “cold fish,” you have a knack for separating factual reporting from emotional or hysterical coloration. You may or may not be emotional yourself, but you can see clearly when others are clouding the facts with their feelings (-1 difficulty on all related rolls).";
