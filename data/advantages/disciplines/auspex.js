import { get } from "lodash";

export const label = "Auspex";

export const description = `Auspex gives the vampire uncanny sensory abilities. She starts with the capacity to heighten her natural senses significantly, but as she grows in power, she can perceive psychic auras and read the thoughts of another being. Auspex can also pierce through mental illusions such as those created by Obfuscate — see the sidebar “Seeing the Unseen” on p. 142 for more. However, a vampire with Auspex needs to be careful. Her increased sensory sensitivity can cause her to be drawn in by beautiful things or stunned by loud noises or pungent smells. Sudden or dynamic events can disorient an Auspex-using character unless her player makes a Willpower roll to block them out (difficulty of at least 4, although the more potent the source of distraction, the higher the difficulty). Failure overwhelms the character’s senses, making her oblivious to her surroundings for a turn or two. While the Malkavians and Toreador are more prone to these kinds of distractions, the Tremere and Tzimisce aren’t immune. Dots in Perception are very useful for using Auspex powers, as more successes help the character gain more sensory information.

Auspex enables Kindred to perceive many things beyond the limits of lesser senses. Among its many uses, Auspex can detect the presence of a supernatural being who is hidden from normal sight (a vampire using Obfuscate, for example, or a ghost) or pierce illusions created by the Discipline of Chimerstry. Note: “Normal sight” includes regular, non-Auspex use of the Awareness skill.
• Obfuscate: When a vampire tries to use her heightened perceptions to notice a Kindred hidden with Obfuscate, she detects the subject’s presence if her Auspex rating is higher than his Obfuscate, and she succeeds at a Perception + Awareness roll (difficulty equals 7 minus the number of dots by which her Auspex exceeds his Obfuscate). Conversely, if the target’s Obfuscate outranks her Auspex, he remains undiscovered. If the two ratings are equal, both characters make a resisted roll of Perception + Awareness (Auspex user) against Manipulation + Subterfuge (Obfuscate user). The difficulty for both rolls is 7, and the character with the most successes wins.
• Chimerstry: Likewise, vampires with Auspex may seek to penetrate illusions created with Chimerstry. The Auspex-wielder must actively seek to pierce the illusion (i.e., the player must tell the Storyteller that his character is trying to detect an illusion). The Auspex-user and Chimerstry-wielder then compare relative ratings, per Obfuscate, above. The process is otherwise identical to piercing Obfuscate.
• Other Powers: Since the powers of beings like magi and wraiths function differently from vampiric Disciplines, a simple comparison of relative ratings isn’t applicable. To keep things simple, both characters make a resisted roll. The vampire rolls Perception + Awareness, while the subject rolls Manipulation + Subterfuge. Again, the difficulty is 7, and the character with the most successes wins.`;

export const rollModifier = ({ sheet }) => ({
	difficulty: get(sheet, "advantages.disciplines.list.auspex", 0) * -1,
	pool: 0
});

export const relatedStats = ["perception"];

export const dots = [
	{
		dot: 1,
		label: "Heightened Sense",
		description: "This power increases the acuity of all of the vampire’s senses, effectively doubling the clarity and range of sight, hearing, and smell. While her senses of taste and touch extend no farther than normal, they likewise become far more distinct; the vampire could taste the hint of liquor in a victim’s blood or feel the give of the board concealing a hollow space in the floor. The Kindred may magnify her senses at will, sustaining this heightened focus for as long as she desires. At the Storyteller’s option, this may make hunting easier. Occasionally, this talent provides extrasensory or even precognitive insights. These brief, unfocused glimpses may be odd premonitions, flashes of empathy, or eerie feelings of foreboding. The vampire has no control over these perceptions, but with practice can learn to interpret them with a fair degree of accuracy. Expanded senses come at a price, however. Bright lights, loud noises and strong smells present a hazard while the vampire uses this power. In addition to the possibility for distraction, an especially sudden or potent stimulus (like the glare of a spotlight or a clap of thunder) can blind or deafen the Kindred for an hour or more. System: It takes a reflexive action to activate this ability, but no roll or other cost is required. In certain circumstances, dice rolls associated with using the character’s sense (such as Perception + Alertness) decrease in difficulty by a number equal to the character’s Auspex rating when the power is engaged. The Storyteller may also use this power to see if the character perceives a threat. In this case, the Storyteller privately rolls the character’s unmodified Auspex rating, applying whatever difficulty he feels best suits the circumstances. For example, sensing that a pistol is pointed at the back of the character’s head may require a roll of difficulty 5, while the sudden realization that a rival for Primogen is planning her assassination may require a 9. Note that even this “precognition” comes only as a result of interpreting details the Kindred is able to notice. It’s not an all-purpose insight or miraculous revelation. At the character’s discretion, she may selectively heighten one specific sense, rather than leaving them all on. In these cases, the difficulty to perceive stimuli using that sense drops by one, but the difficulty to avoid distraction or temporary bedazzlement increases by one. This power does not let characters see in pitch darkness, as does Eyes of the Beast (p. 199), but it does reduce difficulty penalties to act in such darkness from +2 to +1, and the character may make ranged attacks in pitch darkness if she can hear, smell, or otherwise detect her foe"
	},
	{
		dot: 2,
		label: "Aura Perception",
		description: "Using this power, the vampire can perceive the psychic “auras” that radiate from mortals and supernatural beings alike. These halos comprise a shifting series of colors that take practice to discern with clarity. Even the simplest individual has many shifting hues within his aura; strong emotions predominate, while momentary impressions or deep secrets flash through in streaks and swirls. The colors change in sympathy with the subject’s emotional state, blending into new tones in a constantly dancing pattern. The stronger the emotions involved, the more intense the hues become. A skilled vampire can learn much from her subject by reading the nuances of color and brilliance in the aura’s flow. Aside from perceiving emotional states, vampires use Aura Perception to detect supernatural beings. The colors in Kindred auras, while intense, are quite pale; mage halos often flare and crackle with arcane power; the race of shapeshifters has strikingly bright, almost frantic, auras; ghosts have weak auras that flicker fitfully like a dying flame; and faerie creatures’ radiance is shot through with capricious rainbow hues. System: After the character stares at the subject for at least a few seconds, the player rolls Perception + Empathy (difficulty 8); each success indicates how much of the subject’s aura the character sees and understands (see the table below). A failure indicates that the play of colors and patterns yields no prevailing impression. A botch indicates a false or erroneous interpretation. The Storyteller may wish to make this roll, thus keeping the player in the dark as to the veracity of the character’s interpretation. (1 success = Can distinguish only the shade (pale or bright); 2 successes = Can distinguish the main color; 3 successes = Can recognize the color patterns; 4 successes = Can detect subtle shifts; 5 successes = Can identify mixtures of color and pattern) The Aura Colors chart offers some example ideas of common colors and the emotions they reflect that Storytellers can use. Note that it is nearly impossible to determine with certainty if a particular character is lying or not with this power – vampires are inherently deceitful by nature, but even mortals might react with anxiety to questions while still being truthful. It is, however, helpful in determine the target’s emotional state, which might lead the vampire to decide that a particular target is suspicious. A character may choose to perform a very cursory aura scan of a large area like a nightclub’s dance floor or the audience in a gallery. In this case, the player decides which characteristic of auras she’s looking for, and that’s the only information she’s able to glean if the roll is successful. (At the Storyteller’s discretion, on this general scan roll, more successes on the roll may more quickly yield what the character seeks.) For example, the player may specify, “Who’s the most nervous person in attendance?” or “Are there any vampirically pale auras among the CEO’s entourage?” Thereafter, the player may narrow down her scrutiny of a single individual, with an additional roll as normal. The character may focus in on a particular subject’s aura only once per scene with any degree of clarity. Any subsequent attempts that result in failure should be considered botches. It is very easy for the character to imagine seeing what she wants to see when judging someone’s intentions. After 24 hours, the character may try again at no penalty. It is possible, though difficult, to sense the aura of a being who is otherwise invisible to normal sight. Refer to “Seeing the Unseen,” p. 142, for more information."
	},
	{
		dot: 3,
		label: "The Spirit's Touch",
		description: "When someone handles an object for any length of time, he leaves a psychic impression on the item. A vampire with this level of Auspex can “read” these sensations, learning who handled the object, when he last held it, and what was done with it recently. (For these purposes, a corpse counts as an “object” and can be read accordingly.) These visions are seldom clear and detailed, registering more like a kind of “psychic snapshot.” Still, the Kindred can learn much even from such a glimpse. Although most visions concern the last person to handle the item, a long-time owner leaves a stronger impression than someone who held the object briefly. Gleaning information from the spiritual residue requires the vampire to hold the object and enter a shallow trance. She is only marginally aware of her surroundings while using The Spirit’s Touch, but a loud noise or jarring physical sensation breaks the trance instantly. System: The player rolls Perception + Empathy. The difficulty is determined by the age of the impressions and the mental and spiritual strength of the person or event that left them. Sensing information from a pistol used for a murder hours ago may require a 4, while learning who owned a bloodstained puppet fashioned a century ago might be a 9. The greater the individual’s emotional connection to the object, the stronger the impression he leaves on it — and the more information the Kindred can glean from it. Events involving strong emotions (a giftgiving, a torture, a long family history) likewise leave stronger impressions than short or casual contact do. Assume that each success offers one piece of information, as per the chart below. (Botch = The character is overwhelmed by psychic impressions for the next 30 minutes and unable to act; Failure = No information of value; 1 success = Very basic information: the last owner’s gender or hair color, for instance; 2 successes = A second piece of basic information; 3 successes = More useful information about the last owner, such as age and state of mind the last time he used the item; 4 successes = The person’s name; 5+ successes = A wealth of information: nearly anything you want to know about the person’s relationship with that object is available) At the Storyteller’s discretion, some impressions on objects may be so strong — a knife plunged into Caesar’s breast, the tip of the Spear of Destiny, a fang pulled from the maw of Dracula — that any use of this power may be deemed a success"
	},
	{
		dot: 4,
		label: "Telepathy",
		description: "The vampire projects a portion of her consciousness into a nearby mortal’s mind, creating a mental link through which she can communicate wordlessly or even read the target’s deepest thoughts. The Kindred “hears” in her own mind the thoughts plucked from a subject as if they were spoken to her. This is one of the most potent vampiric abilities, since, given time, a Kindred can learn virtually anything from a subject without him ever knowing. The Tremere and Tzimisce in particular find this power especially useful in gleaning secrets from others, or for directing their mortal followers with silent precision. System: The player rolls Intelligence + Subterfuge (difficulty of the subject’s current Willpower points). Projecting thoughts into the target’s mind requires one success. The subject recognizes that the thoughts come from somewhere other than his own consciousness, though he cannot discern their actual origin without a successful Perception + Awareness roll (difficulty equal to the vampire’s Manipulation + Subterfuge). To read minds, one success must be rolled for each item of information plucked or each layer of thought pierced. Deep secrets or buried memories are harder to obtain than surface emotions or unspoken comments, requiring five or more successes to access. Reading thoughts with Telepathy does not commonly work upon the undead mind. A character may expend a Willpower point to make the effort, making the roll normally afterward. Likewise, it is equally difficult to read the thoughts of other supernatural creatures. However, the character may project her thoughts without expending a Willpower point. These thoughts, however, are still obviously intrusions into the target’s mind, but the character may attempt to disguise her mental “voice” with a roll of Manipulation + Subterfuge (difficulty equals the target’s Perception + Awareness) so the target doesn’t recognize her as the “speaker.” Storytellers are encouraged to describe thoughts as flowing streams of impressions and images, rather than as a sequence of prose (powers such as Telepathic Communication are of more use for that). Instead of making flat statements like “He’s planning on killing his former lover’s new boyfriend,” say “You see a fleeting series of visions: A couple kissing passionately in a doorway, then the man walking alone at night; you suddenly see your hands, knuckles white, wrapped around a steering wheel, with a figure crossing the street ahead; your heart, mortal now and hammering with panic as you hear the engine rev wildly; and above all, a blazing anger coupled with emotional agony and a panicked fear of loss.” Such descriptions not only add to the story, but they also force the player to interpret for herself what her character gleans. After all, understanding minds — especially highly emotional or deranged minds — is a difficult and often puzzling task."
	},
	{
		dot: 5,
		label: "Psychic Projection",
		description: "The Kindred with this awesome ability projects her senses out of her physical shell, stepping from her body as an entity of pure thought. The vampire’s astral form is immune to physical damage or fatigue, and can “fly” with blinding speed anywhere across the earth — or even underground — so long as she remains below the moon’s orbit. The Kindred’s material form lies in a torpid state while her astral self is active, and the vampire isn’t aware of anything that befalls her body until she returns to it. An ephemeral silver cord connects the Kindred’s psyche to her body. If this cord is severed, her consciousness becomes stranded in the astral plane (the realm of ghosts, spirits, and shades). Attempting to return to the vampire’s physical shell is a long and terrifying ordeal, especially since there is no guarantee that she will accomplish the journey successfully. This significant danger keeps many Kindred from leaving their bodies for long, but those who dare can learn much. System: Journeying in astral form requires the player to expend a point of Willpower and make a Perception + Awareness roll. Difficulty varies depending on the distance and complexity of the intended trip; 5 is within sight, 7 is nearby or to a familiar location, and 9 reflects a trip far from familiar territory (a first journey from North America to the Far East; trying to shortcut through the earth). The greater the number of successes rolled, the more focused the character’s astral presence is, and the easier it is for her to reach her desired destination. Failure means the character is unable to separate her consciousness from her body, while a botch can have nasty consequences — flinging her astral form to a random destination on Earth or in the spirit realm, arriving in a place where the sun is active (necessitating a frenzy roll, although the sunlight doesn’t do any damage), or hurtling toward the desired destination so forcefully that the silver cord snaps. The player may spend a point of Willpower to activate this power, and an additional point of Willpower to gain the success necessary to perform the jaunt. This is an exception to the normal rule where a player may not spend more than a single point of Willpower per turn. Each scene in Psychic Projection requires another point of Willpower and a new roll. Failure indicates that the vampire has lost her way and must retrace the path of her silver cord. A botch at this stage means the cord snaps, stranding the character’s psychic form in the mysterious astral plane. An astral form may travel at great speeds (the Storyteller can use roughly 1000 miles per hour or 1500 kilometers per hour as a general guide) and carries no clothing or material objects of any kind. Some artifacts are said to exist in the spirit world, and the character can try to use one of these tools if she finds one. The character cannot bring such relics to the physical world when she returns to her body, however. Interaction with the physical world is impossible while using Psychic Projection. At best, the character may spend a Willpower point to manifest as a ghostlike shape. This apparition lasts one turn before fading away; while she can’t affect anything physically during this time, the character can speak. Despite lacking physical substance, an astral character can use Auspex normally. At the Storyteller’s discretion, such a character may employ some or all Animalism, Dementation, Dominate, Necromancy, Obtenebration, Presence, Thaumaturgy, and similar non-corporeal powers she has, though this typically requires a minimum of three successes on the initial Psychic Projection roll. If two astral shapes encounter one another, they interact as if they were solid. They may talk, touch, and even fight as if both were in the material world. Since they have no physical bodies, astral characters seeking to interact “physically” substitute Mental and Social Traits for Physical ones (Wits replaces Dexterity, Manipulation supplants Strength, and Intelligence replaces Stamina). Due to the lack of a material form, the only real way to damage another psychic entity is to cut its silver cord. When fighting this way, consider Willpower points to be health levels; when a combatant loses all of her Willpower, the cord is severed. Although an astrally projected character remains in the reflection of the mortal world, she may venture further into the spirit realms, especially if she becomes lost. Other beings with particular sensitivity to psychic activity, such as ghosts, werewolves, and even some magi, travel the astral plane as well, and can interact with a vampire’s psychic presence normally (although the astrally projected character is not considered a “ghost” for powers such as Necromancy). The observing character notices the astrally projecting vampire with a Perception + Awareness roll (difficulty 8), requiring more successes than the Psychic Projection activation roll. Even those who do notice you won’t be able to identify you; you are merely an immaterial shade hovering in the general area. Storytellers are encouraged to make trips into the spirit world as bizarre, mysterious, and dreamlike as possible. The world beyond is a vivid and fantastic place, where the true nature of things is stronger and often strikingly different from their earthly appearances."
	},
	{
		dot: 6,
		label: "Clairvoyance",
		description: "By using Clairvoyance, a vampire can perceive distant events without using Psychic Projection. By concentrating on a familiar person, place, or object, a character can observe the subject’s immediate vicinity while staying aware of her own surroundings. System: The player rolls Perception + Empathy (difficulty 6) and describes the target she’s trying to look in on. If the roll is successful, the character can then perceive the events and environment surrounding the desired target for one turn per success. Other Auspex powers may be used on the scene being viewed; these are rolled normally. Clairvoyance does split the vampire’s perceptions between what she is viewing at a distance and what is taking place around her. As a result, while using this power, a character is at +3 difficulty on all rolls relating to actions that affect her physical surroundings."
	},
	{
		dot: 6,
		label: "Prediction",
		description: "Some people are capable of finishing their friends’ sentences. Elder vampires with Prediction sometimes begin their friends’ sentences. Prediction is a constant low-level telepathic scan of the minds of everyone the character is in proximity to. While this power does not give the vampire the details of his neighbors’ conscious thoughts, it does provide a wealth of cues as to the subjects’ moods, suppressed reflexes, and attitudes toward the topic of conversation. System: Whenever the character is in conversation and either participant in the discussion makes a Social roll, the player may pre-empt the roll to spend a blood point and make a Perception + Empathy roll (difficulty of the target’s Manipulation + Subterfuge). Each success is an additional die that can be applied to the player’s Social roll or subtracted from the dice pool of the Social roll being made against the character."
	},
	{
		dot: 6,
		label: "Telepathic Communication",
		description: "Telepathy (p. 137) allows a character to pick up only the surface thoughts of other individuals, and to speak to one at a time. With Telepathic Communication, a character can form a more powerful link between his mind and that of other subjects, allowing them to converse in words, concepts, and sensory images at the speed of thought (and without the need for Willpower expenditure, unlike with Telepathy). Vampires with this level of Auspex can act as “switchboard operators,” creating a telepathic web that allows all participants to share thoughts with some or all other members of the network as they choose. System: The player rolls Charisma + Empathy (difficulty equals the target’s current Willpower points) to establish contact, although a willing subject may allow the vampire access and thus obviate the need for a roll. The maximum range at which a subject may be contacted and the maximum number of individuals who may be linked simultaneously with this power depends on the Auspex rating of the vampire who initiates contact. (Auspex 6 = 3 subjects, 500 miles/800 kilometers; Auspex 7 = Perception rating, 1000 miles/1500 kilometers; Auspex 8 = Perception + Empathy, 500 miles/800 kilometers per point of Intelligence; Auspex 9 = 2x (Perception + Empathy), 1000 miles/1500 kilometers per point of Intelligence)"
	},
	{
		dot: 7,
		label: "Karmic Sight",
		description: "The power of Aura Perception (Auspex 2) allows a vampire to take a brief glimpse at the soul of a sub - ject. This power takes Aura Perception several steps forward, allowing a vampire who has mastered Auspex 2 to probe the inner workings of a subject’s mind and soul. System: The player rolls Perception + Empathy (difficulty equals the subject’s current Willpower). The degree of success determines the information gained. (Botch = The character gains a Derangement or Psychological/Mental/Supernatural Flaw similar to one of the target’s for one night, at Storyteller discretion; 1 success = As per five successes on an Aura Perception roll. 2 successes = Subject’s Nature, Demeanor, and Humanity or Path can be determined. 3 successes = Any outside influences on the subject’s mind or soul, such as Dominate or a demonic pact, can be detected. 4 successes = Subject’s Willpower, Humanity or Path, and Virtue ratings can be determined. 5 successes = The state of the subject’s karma may be determined. This is a highly abstract piece of information best left to Storyteller discretion, but should reveal the general balance between “good” and “bad” actions the subject has performed, both recently and over the course of his existence. If the plot merits it, the character may receive visions of one or more incidents in the subject’s past that radically altered his destiny. With this degree of success, some fate-related Merits and Flaws (e.g. Dark Fate) can be identified as well.)"
	},
	{
		dot: 7,
		label: "Mirror Reflex",
		description: "This power was developed by a Toreador elder who made a fearsome reputation through her fencing prowess, acting as a hired champion in dozens of Ventrue duels. Mirror Reflex is similar to Prediction in that it is in essence a low-level telepathic scan of an opponent, but this power taps into physical (rather than social) reflexes, allowing the character to anticipate an enemy’s moves in personal combat. System: The player spends a blood point and rolls Perception + the combat skill the opponent is using (difficulty of the subject’s Manipulation + combat skill in use). Each success is an additional die that can he applied to the character’s dice pools during the next turn of combat for any actions taken against the scanned opponent. The use of Mirror Reflex does take one combat action, and the power has a maximum range in yards or meters equal to the character’s Willpower rating."
	},
	{
		dot: 8,
		label: "Psychic Assault",
		description: "Psychic Assault is nothing less than a direct mindto-mind attack which uses the sheer force of an elder’s will to overpower his target. Victims of Psychic Assault show little outward sign of the attack, save for nosebleeds and expressions of intense agony; all injuries by means of this psychic pressure inflicted are internal. A medical examination of a mortal victim of a Psychic Assault invariably shows the cause of death to be a heart attack or aneurysm, while vampires killed with this power decay to dust instantly, regardless of age. System: The character must touch or make eye contact with his target. The player spends three blood points (and a Willpower point, if assaulting a vampire or other supernatural being) and rolls Manipulation + Intimidation in a contested roll against the victim’s Willpower. The result depends on the number of net successes the attacker rolls. (Botch = The target becomes immune to the attacker’s Psychic Assault for one night per each “1” rolled; Failure = The target is unharmed and may determine that a psychic assault is taking place by succeeding on a Perception + Awareness roll (difficulty 6); 1 success = The target is shaken but unharmed. He loses a temporary Willpower point; 2 successes = The target is badly frightened. He loses three temporary Willpower points and, if a vampire, must roll Courage (difficulty of the attacker‘s Auspex rating) to avoid Rötschreck; 3 successes = The target loses six temporary Willpower points and, if a vampire, must roll Courage as above. If this causes him to lose his last temporary Willpower point, he loses a permanent Willpower point and receives three health levels of bashing damage (soaked normally); 4 successes = The target loses all temporary Willpower points and half of his permanent Willpower points (round down) and suffers three health levels of lethal damage (soaked normally); 5 successes = The target must roll his permanent Willpower (difficulty 7). If he succeeds, apply the effect of four successes, and is also rendered unconscious for the rest of the night. If he fails, the Psychic Assault kills him instantly)"
	},
	{
		dot: 9,
		label: "False Slumber",
		description: "Possibly the source of many Malkavians’ conviction that their sire is alive and well on the astral plane, this power allows a Methuselah‘s spirit to leave his body while in torpor. While seemingly asleep, the vampire is able to project astrally, think, and perceive events normally. System: No roll is needed. This power is considered to be active whenever the vampire’s body is in torpor, and astral travels are handled as per the rules for Psychic Projection. The vampire is not able to awaken physically at will, however — waking from torpor is handled per the normal rules for such an action (see p. 283). A vampire with this power whose silver cord is severed in astral combat loses all Willpower points, as per the rules for astral combat under Psychic Projection, but is not killed. Instead, he loses the use of this Auspex power and half of his permanent Willpower points. Both the Auspex 9 power and the Willpower must be bought back with experience points. The vampire’s soul slowly returns to his body over the course of a year and a day, during which time he may not be awakened from torpor by any means."
	}
];
