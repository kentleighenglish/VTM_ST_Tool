
import archetypes from "./archetypes";

export const clans = {
	ventrue: "Ventrue",
	nosferatu: "Nosferatu",
	tremere: "Tremere",
	brujah: "Brujah",
	gangrel: "Gangrel",
	malkavian: "Malkavian",
	lasombra: "Lasombra",
	toreador: "Toreador",
	banu: "Banu Haqim",
	ravnos: "Ravnos",
	hecata: "Hecata"
};

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
					options: { ...clans }
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
