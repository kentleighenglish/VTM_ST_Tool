import { calculateTraitRating } from "./_utils";

export const archetypes = [
	"Soldier",
	"Judge",
	"Predator"
]

export const clans = [
	"Ventrue",
	"Nosferatu",
	"Tremere",
	"Brujah",
	"Gangrel",
	"Malkavian",
	"Lasombra",
	"Toreador",
	"Banu Haqim",
	"Ravnos",
	"Hecata"
]

export const details = {
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
					options: [...archetypes]
				},
				demeanor: {
					label: "Demeanor",
					type: "select",
					default: null,
					options: [...archetypes]
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
					options: [...clans]
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

export const attributes = {
	label: "Attributes",
	type: "section",
	fields: {
		physical: {
			label: "Physical",
			type: "sectionColumn",
			fields: {
				strength: {
					label: "Strength",
					type: "dots",
					_meta: {
						_params: {
							maxDots: calculateTraitRating
						},
						description: "raw physical strength"
					}
				},
				dexterity: {
					label: "Dexterity",
					type: "dots"
				},
				stamina: {
					label: "Stamina",
					type: "dots"
				}
			}
		},
		social: {
			label: "Social",
			type: "sectionColumn",
			fields: {
				strength: {
					label: "Charisma",
					type: "dots"
				},
				dexterity: {
					label: "Manipulation",
					type: "dots"
				},
				stamina: {
					label: "Appearance",
					type: "dots"
				}
			}
		},
		mental: {
			label: "Mental",
			type: "sectionColumn",
			fields: {
				perception: {
					label: "Perception",
					type: "dots"
				},
				intelligence: {
					label: "Intelligence",
					type: "dots"
				},
				wits: {
					label: "Wits",
					type: "dots"
				}
			}
		}
	}
}

export const abilities = {
	label: "Abilities",
	type: "section",
	fields: {
		talents: {
			label: "Talents",
			type: "sectionColumn",
			fields: {
				alertness: {
					label: "Alertness",
					type: "dots"
				},
				athletics: {
					label: "Athletics",
					type: "dots"
				},
				awareness: {
					label: "Awareness",
					type: "dots"
				},
				brawl: {
					label: "Brawl",
					type: "dots"
				},
				empathy: {
					label: "Empathy",
					type: "dots"
				},
				expression: {
					label: "Expression",
					type: "dots"
				},
				intimidation: {
					label: "Intimidation",
					type: "dots"
				},
				leadership: {
					label: "Leadership",
					type: "dots"
				},
				streetwise: {
					label: "Streetwise",
					type: "dots"
				},
				subterfuge: {
					label: "Subterfuge",
					type: "dots"
				}
			}
		},
		skills: {
			label: "Skills",
			type: "sectionColumn",
			fields: {
				animalKen: {
					label: "Animal Ken",
					type: "dots"
				},
				crafts: {
					label: "Crafts",
					type: "dots"
				},
				drive: {
					label: "Drive",
					type: "dots"
				},
				etiquette: {
					label: "Etiquette",
					type: "dots"
				},
				firearms: {
					label: "Firearms",
					type: "dots"
				},
				larceny: {
					label: "Larceny",
					type: "dots"
				},
				melee: {
					label: "Melee",
					type: "dots"
				},
				performance: {
					label: "Performance",
					type: "dots"
				},
				stealth: {
					label: "Stealth",
					type: "dots"
				},
				survival: {
					label: "Survival",
					type: "dots"
				}
			}
		},
		knowledges: {
			label: "Knowledges",
			type: "sectionColumn",
			fields: {
				academics: {
					label: "Academics",
					type: "dots"
				},
				computer: {
					label: "Computer",
					type: "dots"
				},
				finance: {
					label: "Finance",
					type: "dots"
				},
				investigation: {
					label: "Investigation",
					type: "dots"
				},
				law: {
					label: "Law",
					type: "dots"
				},
				medicine: {
					label: "Medicine",
					type: "dots"
				},
				occult: {
					label: "Occult",
					type: "dots"
				},
				politics: {
					label: "Politice",
					type: "dots"
				},
				science: {
					label: "Science",
					type: "dots"
				},
				technology: {
					label: "Technology",
					type: "dots"
				}
			}
		}
	}
}

export const sheetSkeleton = {
	details,
	attributes,
	abilities
}
