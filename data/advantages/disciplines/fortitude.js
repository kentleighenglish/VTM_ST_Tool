
export const label = "Fortitude";

export const description = "Although all vampires have an unnatural constitution that make them much sturdier than mortals, Fortitude bestows a resilience that would make an action movie hero envious. Vampires with this Discipline can shrug off agonizing trauma and make the most bone-shattering impact look like a flesh wound. The power even offers protection against the traditional banes of vampires, such as sunlight and fire, and the Gangrel, Ravnos, and Ventrue all find that edge incredibly useful. System: A character’s rating in Fortitude adds to his Stamina for the purposes of soaking normal damage (bashing and lethal). A character with this Discipline may also use his dots in Fortitude to soak aggravated damage, though Kindred cannot normally soak things like vampire bites, werewolf claws, magical effects, fire, sunlight, or massive physical trauma. See p. 272, for further details on soaking and damage.";

// @todo change based on fortitude rating
export const rollModifier = () => ({
	difficulty: 0,
	pool: 0
});

export const relatedStats = ["stamina"];

export const dots = [
	{
		dot: 6,
		label: "Personal Armor",
		description: "Nobody likes to get hit, not even Cainites. The easiest way to ensure that one is not hit (or shot, or stabbed) repeatedly is to take the weapon with which one is assaulted away from one’s attacker and break it. That’s where Personal Armor comes in. This application of Fortitude, derived from one popular in the 12th century, causes anything that strikes a Kindred who employs Personal Armor to shatter on impact. System: With the expenditure of two blood points, a vampire can add preternatural hardness to his flesh. Every time an attack is made on the Kindred using Personal Armor (one which he fails to dodge), his player rolls Fortitude (difficulty 8). If the roll grants more successes than the attacker rolled, then the weapon used to make the attack shatters against the vampire’s flesh. (“Magical” weapons may be resistant to this effect, at the Storyteller’s discretion.) The vampire still takes normal damage if the attack is successful, even if the weapon shatters in the process, though this damage may be soaked. If the attack roll botches, any normal weapon automatically shatters. A hand-to-hand attack causes the attacker equal damage to that suffered by the defender when Personal Armor comes into play. If the attacker misses entirely, she still takes one level of bashing damage. The effects of this power last for the duration of the scene."
	},
	{
		dot: 7,
		label: "Shared Strength",
		description: "It’s one thing to laugh off bullets, rather another to watch the ricochets mow down everyone around you. Many Kindred have wished, at one time or another, that they could lend their monstrous vitality to those around them. Those few vampires who have mastered Shared Strength can — if only for a little while. System: Shared Strength duplicates a portion of a vampire’s Fortitude (one dot for every point of blood the vampire spends) to another being. Activating the power requires a Stamina + Survival roll (difficulty 8, increased to 9 if the target is not a normal mortal), and the expenditure of a point of Willpower. Furthermore, the vampire must mark his target by pressing a drop of his blood onto the target’s forehead. This stain remains visible as long as the power is in effect, the duration of which is determined by the initial roll. Successes Duration: (1 Success = One turn; 2 Successes = One scene; 3 Successes = One hour; 4 Successes = One night; 5 Successes = One week; 6 Successes = One month; 7 Successes = One year) The target of this power need not be willing to accept the benefit to receive it, and the bestowing vampire can end the effect at any time for no cost. Particularly sadistic Kindred have come up with any number of ways in which a target’s “devil’s mark” and supernatural endurance can be used to land him in a great deal of trouble. A vampire can never bestow more levels of Fortitude than he himself possesses."
	},
	{
		dot: 8,
		label: "Adamantine",
		description: "Adamantine functions as a more potent version of Personal Armor. System: This power mimics the effects of Personal Armor, save that the vampire who uses it takes no damage from attacks that shatter on her skin."
	}
];
