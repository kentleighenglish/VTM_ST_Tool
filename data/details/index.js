
import archetypes from "./archetypes";
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
					default: null
				},
				player: {
					label: "Player",
					type: "text",
					default: null
				},
				chronicle: {
					label: "Chronicle",
					type: "text",
					default: null
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
					options: { ...archetypes }
				},
				demeanor: {
					label: "Demeanor",
					type: "select",
					default: null,
					options: { ...archetypes }
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
					}), {})
				},
				generation: {
					label: "Generation",
					type: "number",
					default: null
				},
				sire: {
					label: "Sire",
					type: "text",
					default: null
				}
			}
		}
	}
}
