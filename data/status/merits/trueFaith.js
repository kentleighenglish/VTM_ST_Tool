
export const label = "True Faith";

export const type = "supernatural";

export const cost = 7;

export const relatedStats = ["willpower", "conscienceConviction", "selfControl", "courage"];

// @todo make pool increase dependant on true faith dots
export const rollModifier = () => ({
	difficulty: 0,
	pool: 1
});

export const description = "You have a deep-seated faith in and love for God, or whatever name you choose to call the Almighty. You begin the game with one point of True Faith (see the sidebar on p. 372); this Trait adds one die per point to all Willpower and Virtue rolls. You must have a Humanity of 9 or higher to choose this Merit, and if you lose even a single point, all your Faith points are lost and may be regained only when the lost Humanity is recovered. Individuals with True Faith are capable of performing magical acts akin to miracles, but the exact nature of those acts are up to the Storyteller.";
