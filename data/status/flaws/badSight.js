
export const label = "Bad Sight";

export const type = "physical";

// @todo make dynamic 1-3
export const cost = -1;

export const relatedStats = ["perception"];

export const rollModifier = () => ({
	difficulty: 2,
	pool: 0
});

export const description = "Your sight is defective. The difficulties of any die rolls involving the use of your eyesight are increased by two. As a one-point Flaw, this condition can be corrected with glasses or contacts; as a three-point Flaw,the condition is too severe to be corrected.";
