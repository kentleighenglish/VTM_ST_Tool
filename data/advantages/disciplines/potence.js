import { get } from "lodash";

export const label = "Potence";

export const description = `Kindred endowed with Potence possess unnatural strength. This Discipline enables vampire to leap massive distances, lift tremendous weights, and strike opponents with brutal force. Even low ranks of this power can give Kindred physical power beyond mortal bounds. More powerful Kindred can leap so far that they appear to be flying, toss cars like soda cans, and punch through walls like cardboard. While the more subtle mental Disciplines can be awe-inspiring, the brutal effectiveness of Potence is formidable in its own right. The Brujah, Giovanni, Lasombra, and Nosferatu are naturally gifted with this Discipline, but members of other Clans often make a point to find someone who can teach them the awesome power of Potence. System: Each dot that the vampire has in Potence adds one die to all Strength-related dice rolls. Further, the player can spend one blood point and change his Potence dice into an equal number of automatic successes to all Strength-related rolls for the turn. In melee and brawling combat, successes from Potence (either rolled or automatic) are applied to the damage roll results.
While flesh and blood have their limits, undead sinews and vitae have a bit more latitude when it comes to feats of strength. Vampires who are close to Caine in descent are sometimes capable of strength-based maneuvers that awe even other vampires. A product of blood and will as much as of muscle and bone, mastery of Potence gives a vampire the ability to do far more than just lift progressively heavier objects — if the vampire himself is willing to learn an alternate way. Advanced Potence powers can be purchased in the same fashion as advanced Celerity or Fortitude powers: A character can choose to learn an alternate power instead of advancing along the Discipline’s normal progression, and can later go back and re-purchase what he’s missed.`;

export const rollModifier = ({ sheet }) => ({
	pool: get(sheet, "advantages.disciplines.list.potence", 0)
});

export const relatedStats = ["strength"];

export const dots = [
	{
		dot: 6,
		label: "Imprint",
		description: "A vampire with extensive knowledge of Potence can squeeze very, very hard. As a matter of fact, she can squeeze (or press, or push) so hard that she can leave an imprint of her fingers or hand in any hard surface up to and including solid steel. A use of Imprint can simply serve as a threat, or it can be used, for example, to dig handholds into sheer surfaces for purposes of climbing. System: Imprint requires a point of blood to activate. The power remains active for the duration of a scene. The depth of the imprint the vampire creates with Imprint is up to the Storyteller — decisions should take into account how much force the vampire can bring to bear, the toughness of the material, and its thickness. If the object the vampire grasps is thin enough, at the Storyteller’s discretion, the vampire might simply be able to push through it (in the case of a wall) or tear it off (in the case of a spear or pipe)."
	},
	{
		dot: 7,
		label: "Earthshock",
		description: "According to some pundits, Potence is merely the art of hitting something very hard. But what do you do when your target is too far away to hit directly? The answer is, if you’re sufficiently talented with the Discipline, to employ Earthshock. On its simplest level, Earthshock is the ability to hit the ground at point A, and subsequently have the force of the blow emerge from the ground at point B. System: The use of Earthshock requires the expenditure of two blood points, as well as a normal Dexterity + Brawl roll. The vampire punches or stamps on the ground, and, if the attack is a success, the force of the blow emerges from the ground as a geyser of stone and earth directly underneath the target. The attack can be dodged at a +2 difficulty. Earthshock’s range is 10 feet or three meters for every level of Potence the vampire has, up to the limits of visibility. A failure on the attack roll means that the strike goes errant and is liable to explode anywhere within range; a botch means that the vampire pulverizes the ground beneath him and may well bury himself in the process."
	},
	{
		dot: 8,
		label: "Flick",
		description: "It is a truism that “the great ones always make it look easy.” In the case of Flick, that saying stops being a truism and becomes literal truth. With this power, a master of Potence can make the slightest gesture — a wave, a snap of the fingers, the toss of a ball — and have it unleash the full, devastating impact of a deadon strike. The attack can come without warning, limiting the target’s ability to dodge or anticipate; this makes Flick one of the most feared applications of Potence. System: Flick costs a point of blood, and requires a Dexterity + Brawl roll (difficulty 6). The vampire must also make some sort of gesture directing the blow. What the gesture is remains up to the player — anything from a snap of the fingers to a blown kiss has worked in the past. Flick‘s range is equal to the limit of the Kindred’s perception, and the blow struck does damage equal to a normal punch (including all bonuses)."
	}
];
