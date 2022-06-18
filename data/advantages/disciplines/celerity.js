
export const label = "Celerity";

export const description = "Not all vampires are slow, meticulous creatures. When needed, some vampires can move fast — really fast. Celerity allows Assamites, Brujah, and Toreadors to move with astonishing swiftness, becoming practically a blur. The Assamites use their speed in conjunction with stealth to strike quickly and viciously from the shadows before they are noticed. Brujah, on the other hand, simply like the edge that the power gives them against overwhelming odds. The Toreador are more inclined to use Celerity to provide an air of unnatural grace to live performances or for an extra push to complete a masterpiece on time, but they can be as quick to draw blood as any assassin or punk when angered. System: Each point of Celerity adds one die to every Dexterity-related dice roll. In addition, the player can spend one blood point to take an extra action up to the number of dots he has in Celerity at the beginning of the relevant turn; this expenditure can go beyond her normal Generation maximum. Any dots used for extra actions, however, are no longer available for Dexterity-related rolls during that turn. These additional actions must be physical (e.g., the vampire cannot use a mental Discipline like Dominate multiple times in one turn), and extra actions occur at the end of the turn (the vampire’s regular action still takes place per her initiative roll). Normally, a character without Celerity must divide their dice if she wants to take multiple actions in a single turn, as per p. 248. A character using Celerity performs his extra actions (including full movement) without penalty, gaining a full dice pool for each separate action. Extra actions gained through Celerity may not in turn be split into multiple actions, however.";

// @todo change based on celerity rating
export const rollModifier = () => ({
	difficulty: 0,
	pool: 0
});

export const relatedStats = ["dexterity"];

export const dots = [
	{
		dot: 6,
		label: "Projectile",
		description: "Despite the fact that a vampire with Celerity moves at incredible speeds, any bullets he fires or knives he throws while in this state don’t move any faster than they normally would. Scientifically minded Kindred have been baffled by the phenomenon for centuries, but more pragmatic ones have found a way to work around it. Projectile enables a vampire to take his preternatural speed and transfer it into something he has thrown, fired, or launched. System: Projectile requires the expenditure of a blood point. In addition, the player must decide how many levels of his character’s Celerity he is putting into the speed of the launched object. Thus, a character with Celerity 6 in addition to Projectile could decide to put three dots’ worth of speed into a knife he is throwing, and use the other three dots as dice or potential extra actions as per normal. Each dot of Celerity infused into a thrown object becomes an automatic success to the attack’s damage roll, assuming the weapon or projectile actually hits."
	},
	{
		dot: 7,
		label: "Flower of Death",
		description: "In combat, speed kills. A proper application of Celerity in combat can turn even the meekest Cainite into a walking abattoir. How much more deadly, then, is a vampire with the ability to utilize his preternatural speed to the utmost in combat? Flower of Death allows a vampire to take his Celerity and apply it in full to each hand-to-hand or melee attack he makes. System: Flower of Death costs four blood points, but the spectacular effect is well worth it. Once the power is in effect, the vampire’s bonus dice for Dexterity rolls get added to every dice pool for attack the character makes (even if the roll doesn’t use Dexterity) until the end of the scene. Further, even if the Kindred uses some of his Celerity dots for extra actions during the scene, these extra dice are still available. The effect is limited to hand-to-hand or melee weapon attacks — firearms, bows, and other ranged weapons are excluded — but does grant the attacker additional dice for damage rolls. Flower of Death is not cumulative — it is impossible to “layer” uses of the power over one another to create astronomical dice pools"
	},
	{
		dot: 8,
		label: "Zephyr",
		description: "Zephyr produces an effect vaguely similar to one of the legendary comic book-style uses of enhanced speed, allowing its practitioner to run so fast he can run across water. Particularly successful applications of Zephyr allow a vampire to go so far as to run up walls and, in at least one recorded instance, across a ceiling. System: Zephyr requires the expenditure of one point of blood and one point of Willpower. Unfortunately, Zephyr requires such extremes of concentration that it cannot be combined with any form of attack, or indeed, with most any sort of action at all. If a character using Zephyr feels the need to do something else while moving at such tremendous speeds, a Willpower roll (difficulty 8) is required. Needless to say, botches at Zephyr speed can be spectacular in all the wrong ways. Most times, a vampire moving at such a rate of speed is barely visible, appearing more as a vampire-shaped blur than anything else. Observers must succeed on a Perception + Alertness roll (difficulty 7) to get a decent look at a Kindred zooming past in this fashion."
	}
];
