
export const label = "Deaf";

export const type = "physical";

export const cost = -4;

export const relatedStats = ["perception"];

export const rollModifier = () => ({
	difficulty: 3,
	pool: 0
});

export const description = "You cannot hear. While you may be more resistant to some applications of Dominate, you also may not listen to electronic or vocal media, and the difficulties of many Perception rolls are increased by three.";
