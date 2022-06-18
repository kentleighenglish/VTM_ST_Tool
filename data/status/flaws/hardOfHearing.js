
export const label = "Hard of Hearing";

export const type = "physical";

export const cost = -1;

export const relatedStats = ["perception", "investigation", "empathy"];

export const rollModifier = () => ({
	difficulty: 2,
	pool: 0
});

export const description = "Your hearing is defective. The difficulties of any rolls involving the use of hearing are increased by two.";
