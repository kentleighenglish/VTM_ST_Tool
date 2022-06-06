
export const label = "Open Wound";

export const type = "physical";

// @todo work on dynamic 2-4 cost
export const cost = -2;

export const relatedStats = ["charisma", "manipulation", "appearance"];

export const rollModifier = {
	difficulty: 1,
	pool: 0
};

export const description = "You have one or more wounds that refuse to heal, and which constantly drip blood. This slow leakage costs you an extra blood point per evening (marked off just before dawn), in addition to drawing attention toyou. If the wound is visible, you are at + 1 difficulty for all Social-based rolls. For two points, the Flaw is simply unsightly and has the basic effect mentioned above; for four points the seeping wound is serious or disfiguring and includes the effects of the Flaw: Permanent Wound.";
