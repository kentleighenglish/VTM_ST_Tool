
import * as archetypes from "./archetypes";
import * as clans from "./clans";

export default {
	label: null,
	type: "section",
	fields: {
		info: {
			label: null,
			type: "sectionColumn",
			fields: {
				name: {
					label: "Name",
					type: "text",
					default: null,
					meta: {
						description: "Your character's name"
					}
				},
				player: {
					label: "Player",
					type: "text",
					default: null,
					meta: {
						description: "The player who controls this character"
					}
				},
				chronicle: {
					label: "Chronicle",
					type: "text",
					default: null,
					meta: {
						description: "The name of your current campaign/story"
					}
				}
			}
		},
		character: {
			label: null,
			type: "sectionColumn",
			fields: {
				nature: {
					label: "Nature",
					type: "select",
					default: null,
					options: Object.keys(archetypes).reduce((acc, key) => ({
						...acc,
						[key]: archetypes[key].label
					}), {}),
					meta: {
						description: "Nature is the character’s “real” self, the person she truly is. The Archetype a player chooses reflects that character’s deep-rooted feelings about herself, others, and the world. Nature should not be the only aspect of a character’s true personality, merely the most dominant. Nature is also used to determine a character’s ability to regain Willpower points"
					}
				},
				demeanor: {
					label: "Demeanor",
					type: "select",
					default: null,
					options: Object.keys(archetypes).reduce((acc, key) => ({
						...acc,
						[key]: archetypes[key].label
					}), {}),
					meta: {
						description: "Demeanor is the way a character presents herself to the outside world. It is the “mask” she wears to protect her inner self. A character’s Demeanor often differs from her Nature, though it might not. Also, Demeanor refers to the attitude a character adopts most often — people change Demeanors as often as they change their minds. Demeanor has no effect on any rules."
					}
				},
				concept: {
					label: "Concept",
					type: "text",
					default: null,
					meta: {
						description: "A character’s concept generally refers to who the character was before becoming a vampire. Many Kindred cling desperately to any salvageable aspects of their former selves — their self-image, their occupation, how they lived, what was unique about them. In their new nocturnal world, echoes of their mortal lives are all that stand between many Kindred and madness. Concept is important because it helps a vampire relate to the world. It’s not a numerical Trait, and it has no mechanical effect on the game. Its benefit is that it allows you to formulate a personality for your character, and it provides an anchor for a vampire who wishes to preserve her dwindling Humanity — or to rail against it. Some sample concepts are presented on p. 80. If you don’t see a concept you like, make one up! Its sole purpose is to help you express your character idea concisely."
					}
				}
			}
		},
		vampire: {
			label: null,
			type: "sectionColumn",
			fields: {
				clan: {
					label: "Clan",
					type: "select",
					default: null,
					options: Object.keys(clans).reduce((acc, key) => ({
						...acc,
						[key]: clans[key].label
					}), {}),
					meta: {
						description: "A character’s Clan is her vampire “family,” the undead legacy into which she was Embraced. Vampires are always of the same Clan as their sires, the vampires who Embrace them. Go back to Chapter Two, look at the templates, and decide which Clan you’d like your character to be. As previously mentioned, the Storyteller may disallow members of certain Clans based on the Sect the chronicle involves. Many chronicles, for example, allow only vampires from the Camarilla Clans, while games run at conventions or by organized play clubs sometimes stipulate specific “venue appropriate” criteria. If a player wishes, she need not choose a Clan at all. Many vampires in the modern nights have blood so diluted that they can truly claim no Clan. Unwanted and scorned, these Clanless “Caitiff” are increasingly common. If you wish to play such a character, simply write “Caitiff” under the Clan heading on the character sheet."
					}
				},
				generation: {
					label: "Generation",
					type: "number",
					default: null,
					meta: {
						description: "The vampire's generation"
					}
				},
				sire: {
					label: "Sire",
					type: "text",
					default: null,
					meta: {
						description: "The sire who embraced the kindred"
					}
				}
			}
		}
	}
}
