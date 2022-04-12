
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
					default: null
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
