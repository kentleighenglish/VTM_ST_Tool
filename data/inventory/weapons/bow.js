
export const label = "Bow";

export const description = `Bows can be built to fit any human physique (a
combination of Strength and Size). A bow’s base Damage
is equal to its minimum Strength. A bow’s short Range is
equal to triple the shooter’s Strength + Size + Athletics.
A bow’s Size is one less than the Size of the user for which
it’s built. Penalties for insufficient strength are doubled for
bows. A character versed in primitive woodcraft may make
her own bow with an extended Dexterity + Survival roll
(successes required are equal to 10 times the bow’s minimum
Strength; each roll equals four hours’ work). A character
may use either Athletics or Firearms to fire a bow. “Reloading” a bow takes one action.
A compound bow employs a set of pulleys rather than
the raw tensile strength of the bow itself. A compound
bow’s Traits are the same, save for its range, which is equal
to quadruple the shooter’s Strength + Size + Athletics. A
character may not make her own compound bow.`;

export const stats = ({ strength }) => ({
	damage: {
		lethal: strength
	},
	size: 3
});
