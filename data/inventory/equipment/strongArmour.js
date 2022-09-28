
export const label = "Strong Armour";

export const description = `Called a “bastard” sword because it is
said to be the bastard child of the long sword and the great
sword (and also called the “hand-and-a-half”), this sword
can be wielded with a single hand or held in two for greater
damage. Wielding it one-handed requires a Strength of 4,
and provides a Damage of 3(L). Wielding it two-handed
demands a Strength of 3, and allows a Damage of 4(L).
Popular about 500 years ago, bastard swords are now
generally weapons of antiquity and show up at auctions and
in museums. However, one group of werewolves sometimes
leaves them behind as a kind of calling card. Some of the
Pure known as the Ivory Claws plunge them into the murdered bodies of their Forsaken prey, presumably because the
Uratha werewolves are considered bastards by the Pure.`;

export const stats = () => ({
	defence: {
		bashing: 3,
		lethal: 2
	},
	penalties: {
		dexterity: 2
	}
});
