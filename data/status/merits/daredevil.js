
export const label = "Daredevil";

export const type = "physical";

export const cost = 3;

export const relatedStats = ["dexterity", "athletics"];

export const rollModifier = () => ({
	difficulty: 0,
	pool: 3,
	botch: -1
});

export const description = "You are good at taking risks, and even better at surviving them. When attempting exceptionally risky non-combat actions (such as leaping from one moving car to another), characters with this Merit add an additional three dice to their rolls, and negate a single botch die that may result from such a roll. Generally, such actions must be at least difficulty 8 and have the potential to inflict at least three health levels of damage if failed.";
