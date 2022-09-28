
export const label = "Zweihander Sword";

export const description = `This is a monstrous weapon, longer and
larger than even the great sword, with a hilt of over a foot,
and a blade that measures nearly five feet in length. The
zweihander is taller than some people. It also weighs nearly
14 pounds, requiring a Herculean effort just to swing the
weapon, regardless of accuracy. The blade itself might be
flamberge (wavy curves like a snake) or have parrying hooks
about 10 inches up from the hilt.
If one can wield this beast and connect with it, the
massive weapon can wreak hideous damage. Attacks made
with this sword apply the 9 again rule to the roll.`;

export const stats = () => ({
	damage: {
		lethal: 4
	},
	size: 4
});

export const rollAgain = 9;
