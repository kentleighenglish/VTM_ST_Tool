
export const label = "Flail (Spiked)";

export const description = `Consisting of only a heavy ball attached to a
wooden or metal handle with a length of chain or rope,
flails have been used by peasants throughout history to
thresh wheat. However, when the time came to defend
themselves (as in the French or American Revolutions),
farmers were able to wield their grain-threshing flails
with some effectiveness against the enemy.
The medieval flail grew out of this idea, and became
a weapon that helped thwart the knighted class. With
the combat version of the flail, the ball is heavier (no
more wooden handles, for instance), and is sometimes peppered with spikes. The historical advantage is that
the flail could reach over and around a knight’s shield
because of its chain. A sword’s blade did not bend, but
the flail was flexible. Because of this, it wasn’t considered an honorable weapon, and did not match the
proliferation of swords and daggers upon the battlefield.
Regardless of history, even now shields do not offer any
Defense bonus against flails (see p. 178 for information
on shields).
If the flail is just a heavy weight atop a chain, the
flail does bashing damage. If that weight is spiked, it does
lethal damage. The flail requires a Dexterity 3 in addition
to Strength 3 to use effectively. Without the Dexterity
requirement, the wielder suffers a –1 penalty to attack.`;

export const stats = ({ dexterity = 0, strength = 0 }) => {
	let damage = 3;

	if (dexterity < 3 || strength < 3) {
		damage = damage - 1;
	}

	return {
		damage: {
			lethal: damage
		},
		size: 3
	};
};
