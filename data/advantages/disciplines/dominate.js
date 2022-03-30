
export const label = "Dominate";

export const description = `Dominate is one of the most dreaded of Disciplines. It is a vampire’s ability to influence another person’s thoughts and actions through her own force of will. Dominate requires that the vampire capture her victim’s gaze (see p. 152); as such, it may be used against only one subject at a time. Further, commands must be issued verbally, although simple orders may be made with signs — for example, a pointed finger and forceful expression to indicate “Go!” However, the subject won’t comply if he can’t understand the vampire, no matter how powerful the Kindred’s will is.
Eye Contact: Many myths and stories exist about a vampire’s mystical ability to put people under her spell by looking deeply into her victim’s eyes. The persistence of such stories through the ages isn’t surprising, since a number of Kindred Disciplines powers (most notably Dominate) require eye contact in order to work. Other vampires, learning of this requirement, have attempted everything from wearing mirrored sunglasses to gouging out their own eyes in order to prevent an elder from exerting his will upon them. But Kindred are not so easily thwarted. The need for eye contact stems from the aggressor Kindred’s need to see his victim’s soul, and the eyes are the traditionally known as the windows to the soul. While the vampire needs to capture his target’s attention, the target’s eyes need not be present for such a power to work (although the arts of the Tzimisce make this somewhat challenging at times) — they only need to find the soul of his victim laid bare. A target trying to avoid eye contact can make a Willpower roll against a difficulty equal to Dominate user’s Manipulation + Intimidation (or other appropriate combination for other Disciplines or specific situations, at the Storyteller’s discretion). The difficulty may be reduced for mitigating factors: -1 in the case of the target obscuring his eyes slightly (such as closing her eyes or wearing dark sunglasses) up to a -3 for the eyes being completely unseen (such as with a thick blindfold or having her eyes torn out). Ultimately, however, it is up to the Storyteller to decide whether eye contact is established in a particular case.
Most victims cannot stand against the effects of Dominate. Still, there are situations
where this Discipline is powerless to sway the
subject.
Resisting Dominate:
• Mortals: Few mortals can hope to resist Dominate, as their strength of will nothing compared to the supernatural magnetism of a vampire. Still, there are extremely rare individuals who, due to strong religious faith, unique psychic talent, or extraordinary mental resolve, can shrug off this Discipline’s effects. Only a foolish vampire ignores the potential threat such human beings represent. (See p. 372 for more information about True Faith, for example.)
• Vampires: It is impossible to Dominate another Kindred who is of stronger Blood. The vampire must be of an equal or higher Generation than the target for the powers to be effective. Scholars of the Kindred condition suspect that this is one of the protections Caine put in place to protect himself from the whims of his willful childer. A faction of those who believe this theory also maintain that this implies that Caine himself employed the Discipline of Dominate.
• Nature: A character’s Nature can have a distinct impact on how easily Dominate influences her. A vampire might easily control subjects with inherently empathic Natures (Caregiver, Child, Conformist), while those whose Natures denote a great degree of inner strength (Bravo, Director, Rebel) can be more of a challenge. The Storyteller may reduce the required difficulty or number of successes by one or two when the player rolls against those subjects with “weaker” Natures, or raise them by a similar amount for “stronger” Natures. On the other hand, “strong” Natures might be more easiliy influenced to take aggressive actions — for example, coaxing a Rebel to denounce the Prince is likely easier than goading a Conformist to do the same thing. Ultimately, the Storyteller must adjudicate.
• Botches: If a Dominate roll botches, the target is rendered immune to future attempts by the same vampire for the rest of the story.`;

export const powers = [
	{
		dot: 1,
		label: "Command",
		description: `The vampire locks eyes with the subject and speaks a one-word command, which the subject must be obey instantly. The order must be clear and straightforward: run, agree, fall, yawn, jump, laugh, surrender, stop, scream, follow. If the command is at all confusing or ambiguous, the subject may respond slowly or perform the task poorly. The subject cannot be ordered to do something directly harmful to herself, so a command like “die” is ineffective. The command may be included in a sentence, thereby concealing the power’s use from others. This effort at subtlety still requires the Kindred to make eye contact at the proper moment and stress the key word slightly. An alert bystander — or even the victim — may notice the emphasis. Still, unless she’s conversant with supernatural powers, the individual is likely to attribute the utterance and the subsequent action to bizarre coincidence. System: The player rolls Manipulation + Intimidation (difficulty equals the target’s current Willpower points). More successes force the subject to act with greater vigor or for a longer duration (continue running for a number of turns, go off on a laughing jag, scream uncontrollably). Remember, too, that being commanded to against one’s Nature confounds the use of this power. Being told to “sleep!” in a dangerous situation or “attack!” in police custody may not have the desired effect, or indeed, any effect at all.`
	},
	{
		dot: 2,
		label: "Mesmerize",
		description: `With this power, a vampire can verbally implant a false thought or hypnotic suggestion in the subject’s subconscious mind. Both Kindred and target must be free from distraction, since Mesmerize requires intense concentration and precise wording to be effective. The vampire may activate the imposed thought immediately or establish a stimulus that will trigger it later. The victim must be able to understand the vampire, though the two need to maintain eye contact only as long as it takes to implant the idea. Mesmerize allows for anything from simple, precise directives (handing over an item) to complex, highly involved ones (taking notes of someone’s habits and relaying that information at an appointed time). It is not useful for planting illusions or false memories (such as seeing a rabbit or believing yourself to be on fire). A subject can have only one suggestion implanted at any time System: The player rolls Manipulation + Leadership (difficulty equal to the target’s current Willpower points). The number of successes determines how well the suggestion takes hold in the victim’s subconscious. If the vampire scores one or two successes, the subject cannot be forced to do anything that seems strange to her (she might walk outside, but is unlikely to steal a car). At three or four successes, the command is effective unless following it endangers the subject. At five successes or greater, the vampire can implant nearly any sort of command. No matter how strong the Kindred’s will, his command cannot force the subject to harm herself directly or defy her innate Nature. So, while a vampire who scored five successes could make a 98-pound weakling attack a 300-pound bouncer, he could not make the mortal shoot herself in the head. If a vampire tries to Mesmerize a subject before the target fulfills a previously implanted directive, compare the successes rolled to those gained during the implanting of the first suggestion. Whichever roll had the greater number of successes is the command that now governs in the target’s behavior; the other suggestion is wiped clean. If the successes rolled are equal, the newer command supplants the old one.`
	},
	{
		dot: 3,
		label: "The Forgetful Mind",
		description: `After capturing the subject’s gaze, the vampire delves into the subject’s memories, stealing or re-creating them at his whim. The Forgetful Mind does not allow for telepathic contact; the Kindred operates much like a hypnotist, asking directed questions and drawing out answers from the subject. The degree of memory alteration depends on what the vampire desires. He may alter the subject’s mind only slightly (quite effective for eliminating memories of the victim meeting or even being fed upon by the vampire) or utterly undo the victim’s memories of her past. The degree of detail used has a direct bearing on how strongly the new memories take hold, since the victim’s subconscious mind resists the alteration. A simplistic or incomplete false memory (“You went to the movies last night”) crumbles much more quickly than does one with more attention to detail (“You thought about texting your girlfriend while you were in line at the new movie theater, but you knew you’d have to turn your phone off once you got inside. You liked the movie well enough, but the plot seemed weak. You were tired after it ended, so you went home, watched a little late-night television, and went to bed.”). Even in its simplest applications, The Forgetful Mind requires tremendous skill and finesse. It’s a relatively simple matter to rifle through a victim’s psyche and rip out the memories of the previous night without knowing what the subject did that evening. Doing so leaves a gap in the victim’s mind, however — a hole that can give rise to further problems down the road. The Kindred may describe new memories, but these recollections seldom have the same degree of realism that the subject’s original thoughts held. As such, this power isn’t always completely effective. The victim may remember being bitten, but believe it to be an animal attack. Greater memories may return in pieces as dreams, or through sensory triggers like a familiar odor or spoken phrase. Even so, months or years may pass before the subject regains enough of her lost memories to make sense of the fragments. A vampire can also sense when a subject’s memories were altered through use of this power, and even restore them, as a hypnotist draws forth suppressed thoughts. System: The player states what sorts of alteration he wants to perform, then rolls Wits + Subterfuge (difficulty equal to the target’s current Willpower points). Any success pacifies the victim for the amount of time it takes the vampire to perform the verbal alteration, provided the vampire does not act aggressively toward her. The table below indicates the degree of modification possible to the subject’s memory. If the successes rolled don’t allow for the extent of change the character desired, the Storyteller reduces the resulting impact on the victim’s mind. (1 success = May remove a single memory, lasts one day; 2 successes = May remove, but not alter, memory permanently; 3 successes = May make slight changes to memory; 4 successes = May alter or remove entire scene from subject’s memory; 5 successes = May reconstruct entire periods of subject’s life) To restore removed memories or sense false ones in a subject, the character’s Dominate rating must be equal to or higher than that of the vampire who made the alteration. In that situation, the player must make a Wits + Empathy roll (difficulty equal to the original vampire’s permanent Willpower rating) and score more successes than his predecessor did. However, the Kindred cannot use The Forgetful Mind to restore his own memories if they were stolen in such a way.`
	},
	{
		dot: 4,
		label: "Conditioning",
		description: `Through sustained manipulation, the vampire can make a subject more pliant to the Kindred’s will. Over time, the victim becomes increasingly susceptible to the vampire’s influence while simultaneously growing more resistant to the corrupting efforts of other Kindred. Gaining complete control over a subject’s mind is no small task, taking weeks or even months to accomplish. Kindred often fill their retainers’ heads with subtle whispers and veiled urges, thereby ensuring these mortals’ loyalty. Yet vampires must pay a high price for the minds they ensnare. Servants Dominated in this way lose much of their passion and individuality. They follow the vampire’s orders quite literally, seldom taking initiative or showing any imagination. In the end, such retainers become like automatons or the walking dead. System: The player rolls Charisma + Leadership (difficulty equal to the target’s current Willpower points) once per scene. Conditioning is an extended action, for which the Storyteller secretly determines the number of successes required. It typically requires between five and 10 times the subject’s Self-Control/Instinct rating. Targets with more empathic Natures may require a lower number of successes, while those with willful Natures require a higher total. Only through roleplaying may a character discern whether his subject is conditioned successfully. A target may become more tractable even before becoming fully conditioned. Once the vampire accumulates half the required number of successes, the Storyteller may apply a lower difficulty to the vampire’s subsequent uses of Dominate. After being conditioned, the target falls so far under the vampire’s influence that the Kindred need not make eye contact or even be present to retain absolute control. The subject does exactly as she is told (including taking actions that would injure herself), as long as her master can communicate with her verbally. No command roll is necessary unless the subject is totally isolated from the vampire’s presence (in a different room, over the phone). Even if a command roll fails, the target will still likely carry out part of the orders given, simply because her master wishes it. After the subject is fully conditioned, other Kindred find her more difficult to Dominate. Such conditioning raises others’ difficulties by two (to a maximum of 10). It is possible, though difficult, to shake Conditioning. The subject must be separated entirely from the vampire to whom she was in thrall. This period of separation varies depending on the individual, but the Storyteller may set it at six months, less a number of weeks equal to the subject’s permanent Willpower rating (so a person with 5 Willpower must stay away from the vampire for just under five months). The subject regains her personality slowly during this time, though she may still lapse into brief spells of listlessness, despair, or even anger. If the vampire encounters the target before that time passes, a single successful Charisma + Leadership roll (difficulty of the target’s current Willpower points) on the part of the vampire completely reasserts the dominance. If the subject makes it through the time period without intervention by her master, the target regains her former individuality. Even so, the vampire may reestablish conditioning more easily than the first time, since the subject is now predisposed to falling under the Kindred’s mental control. New attempts require half the total number of successes than the last bout of conditioning did (which means the subject reaches the threshold for reduced difficulties sooner, as well).`
	},
	{
		dot: 5,
		label: "Possession",
		description: `At this level of Dominate, the force of the Kindred’s psyche is such that it can utterly supplant the mind of a mortal subject. Speaking isn’t required, but the vampire must capture the victim’s gaze. During the psychic struggle, the contestants’ eyes are locked on one another. Once the Kindred overwhelms the subject’s mind, the vampire moves his consciousness into the victim’s body and controls it as easily as he uses his own. The mortal falls into a mental fugue while under possession. She is aware of events only in a distorted, dreamlike fashion. In turn, the vampire’s mind focuses entirely on controlling his mortal subject. His own body lies in a torpid state, defenseless against any actions made toward it. Vampires cannot possess one another in this fashion, as even the weakest Kindred’s mind is strong enough to resist such straightforward mental dominance. Only through a blood bond can one vampire control another to this degree. Supernatural creatures also cannot be possessed in this way, although ghouls that have drunk from the vampire using Possession can. System: The vampire must completely strip away the target’s Willpower prior to possessing her. The player spends a Willpower point, then rolls Charisma + Intimidation, while the subject rolls his Willpower in a resisted action (difficulty 7 for each). For each success the vampire obtains over the victim’s total, the target loses a point of temporary Willpower. Only if the attacker botches can the subject escape her fate, since this makes the target immune to any further Dominate attempts by that vampire for the rest of the story. Once the target loses all her temporary Willpower, her mind is open. The vampire rolls Manipulation + Intimidation (difficulty 7) to determine how fully he assumes control of the mortal shell. Similar to the Animalism power Subsume the Spirit, multiple successes allow the character to utilize some mental Disciplines, noted on the chart below. (Vampires possessing ghouls can use the physical Disciplines the ghoul possesses, but not the mental ones.) (1 success = Cannot use Disciplines; 2 successes = Can use Auspex and other sensory powers; 3 successes = Can also use Presence and other powers of emotional manipulation; 4 successes = Can also use Dementation, Dominate, and other powers of mental manipulation; 5 successes = Can also use Chimerstry, Necromancy, Thaumaturgy, and other mystical powers) The character may travel as far from his body as he is physically able while possessing the mortal. The vampire may also venture out during the day in the mortal form. However, the vampire’s own body must be awake to do so, requiring a successful roll to remain awake (see p. 262). If the vampire leaves the mortal shell (by choice, if his body falls asleep, through supernatural expulsion, after sustaining significant injury, etc.), his consciousness returns to his physical form in an instant. Once freed from possession, the mortal regains mental control of herself. This can happen in an instant, or the victim may lie comatose for days while her psyche copes with the violation. The vampire experiences everything the mortal body feels during possession, from pleasure to pain. In fact, any damage the victim’s body sustains is also applied to the character’s body (though the Kindred may soak as normal). If the mortal dies before the vampire’s soul can flee from the body, the character’s body falls into torpor. Presumably this is in sympathetic response to the massive trauma of death, though some Kindred believe that the vampire’s soul is cast adrift during this time and must find its way back to the body. The Kindred can remain in the mortal’s body even if his own torpid form is destroyed, though such a pathetic creature is not likely to exist for long. At each sunrise, the vampire must roll Courage (difficulty 8) or be expelled from the body. If forced from the mortal body, the vampire tumbles into the astral plane, his soul permanently lost in the spirit world. A vampire trapped in a mortal body may not be “re-Embraced.” If the Embrace occurs to such a creature, he simply meets Final Death.`
	},
	{
		dot: 6,
		label: "Chain the Psyche",
		description: `Not content with merely commanding their subjects, some elders apply this power to ensure obedience from recalcitrant victims. Chain the Psyche is a Dominate technique that inflicts incapacitating pain on a target who attempts to break the vampire’s commands. System: The player spends a blood point when her character applies Dominate to a subject. Any attempt that the subject makes to act against the vampire’s implanted commands or to recover stolen memories causes intense pain. When such an attempt is made, the Storyteller rolls the character‘s Manipulation + Intimidation (difficulty equal to the subject’s Stamina + Empathy). Each success equals one turn that the victim is unable to act, as she is wracked with agony. Each application of Chain the Psyche crushes a number of resistance attempts equal to the character’s Manipulation rating, after which the effect fades.`
	},
	{
		dot: 6,
		label: "Loyalty",
		description: `With this power in effect, the elder’s Dominate is so strong that other vampires find it almost impossible to break with their own commands. Despite the name, Loyalty instills no special feelings in the victim — the vampire’s commands are simply implanted far more deeply than normal. System: Any other vampire attempting to employ Dominate on a subject who has been Dominated by a vampire with Loyalty has a +3 difficulty modifier to his rolls and must spend an additional Willpower point.`
	},
	{
		dot: 6,
		label: "Obedience",
		description: `While most Kindred must employ Dominate through eye contact, some powerful elders may command loyalty with the lightest brush of a hand. System: The character can employ all Dominate powers through touch instead of eye contact (although eye contact still works). Skin contact is necessary — simply touching the target’s clothing or something she is holding will not suffice. The touch does not have to be maintained for the full time it takes to issue a Dominate command, though repeated attempts to Dominate a single target require the character to touch the subject again.`
	},
	{
		dot: 7,
		label: "Mass Manipulation",
		description: `A truly skilled elder may command small crowds through the use of this power. By manipulating the strongest minds within a given group, a gathering may be directed to the vampire’s will. System: The player declares that he is using this power before rolling for the use of another Dominate power. The difficulty of the roll is that which would be required to Dominate the most resistant member of the target group — if he cannot be Dominated, no one in his immediate vicinity can. For every success past that needed to inflict the desired result on the first target, the player may choose one additional target to receive the same effect in its entirety. The vampire needs to make eye contact only with the initial target.`
	},
	{
		dot: 7,
		label: "Still the Mortal Flesh",
		description: `Despite its name, this power may be employed onvampires as well as mortals, and it has left more thanone unfortunate victim writhing in agony — or unableto do even that. A vampire who has developed thispower is able to override her victim’s body as easily ashis mind in order to cut off his senses or even stop hisheart. It is rumored that this power once came moreeasily to the Kindred, but modern medicine has madethe bodies and spirits of mortals more resistant to suchmanipulations.System: The player rolls Manipulation + Medicine(difficulty equal to the target’s current Willpowerpoints + 2; a difficulty over 10 means that this powercannot affect the target at all). The effect lasts for oneturn per success. The player must choose what function of the target’s body is being cut off before rolling.She may affect any of the body’s involuntary functions;breathing, circulation, perspiration, sight, and hearingare all viable targets. While Still the Mortal Flesh is in effect, a vampire can either stop any one of those functions entirely or cause them to fluctuate erratically.The exact effects of any given bodily function beingshut off are left to the Storyteller. Most mortals panicif suddenly struck blind, but only the shutdown of theheart will kill a target on the spot. Vampires are unaffected by loss of heartbeat or breathing, but may berendered deaf and blind as easily as mortals.`
	},
	{
		dot: 8,
		label: "Far Mastery",
		description: `This refinement of Obedience (though the character need not have learned Obedience first) allows the use of Dominate on any subject that the vampire is familiar with, at any time, over any distance. If the elder knows where his target is, he may issue commands as if he were standing face- to-face with his intended victim. System: The player spends a Willpower point and rolls Perception + Empathy (difficulty equal to the subject’s Wits + Stealth) to establish contact. If this roll succeeds, Dominate may be used as if the character had established eye contact with the target. A second Willpower point must be spent in order for a vampire to use this power on another vampire or other supernatural being.`
	},
	{
		dot: 9,
		label: "Speak Through the Blood",
		description: `The power structures of Methuselahs extend across continents and centuries. This power allows such ancients to wield control over their descendants, even those far outside their geographic spheres of influence. Speak Through the Blood allows an elder to issue commands to every vampire whose lineage can be traced to her — even if the two have never met. Thus, entire broods act to further the goals of sleeping ancients whose existences they may be completely unaware of. The vampires affected by this power rarely act directly to pursue the command they were given, but over a decade or so, their priorities slowly shift until the fulfillment of the Methuselah‘s command is among their long-term goals. Speak Through the Blood, because it takes effect so slowly, is rarely recognized as an outside influence, and its victims rationalize their behavior as “growing and changing,” or something to that effect. System: The player spends a permanent Willpower point and rolls Manipulation + Leadership. The difficulty of this roll is equal to four plus the number of Generations to which the command is to be passed. Unless the character is aware of the location and present agenda of every descendant of his — a highly unlikely event — he may only issue general commands, such as “work for the greater glory of Clan Malkavian” or “destroy all those who seek to extinguish the light of knowledge.” Speak Through the Blood can be used by a vampire in torpor. Commands issued through this power last for one decade per success on the roll. Difficulties over 10 require one additional success for each point past 10, making it that much more difficult to issue long-lasting commands stretching down to the ends of one’s lineage. A vampire who has reached Golconda is not affected by this power, and is completely unaware that it has been used. Her childer, however, are affected normally unless they are also enlightened. Ghouls of the victims of this power are also affected, but to a lesser extent.`
	},
	{
		dot: 1,
		label: "",
		description: ``
	},
	{
		dot: 1,
		label: "",
		description: ``
	},
	{
		dot: 1,
		label: "",
		description: ``
	},
];
