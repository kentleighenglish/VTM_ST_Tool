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
						description: `Strength is the raw, brute power of a character.
						It governs how much weight a character can lift, how
						much he can physically push, and how hard he can
						hit another character or object. The Strength Trait is
						added to a character’s damage dice pool when he hits
						his opponent in hand-to-hand combat. It is also used
						when a character wishes to break, lift, or carry something,
						as well as when a character tries to jump a distance.`
					}
				},
				dexterity: {
					label: "Dexterity",
					type: "dots",
					_meta: {
						_params: {
							maxDots: calculateTraitRating
						},
						description: "raw physical strength"
					}
				},
				stamina: {
					label: "Stamina",
					type: "dots",
					_meta: {
						_params: {
							maxDots: calculateTraitRating
						},
						description: "raw physical strength"
					}
				}
			}
		},
		social: {
			label: "Social",
			type: "sectionColumn",
			fields: {
				charisma: {
					label: "Charisma",
					type: "dots",
					_meta: {
						_params: {
							maxDots: calculateTraitRating
						},
						description: "raw physical strength"
					}
				},
				manipulation: {
					label: "Manipulation",
					type: "dots",
					_meta: {
						_params: {
							maxDots: calculateTraitRating
						},
						description: "raw physical strength"
					}
				},
				appearance: {
					label: "Appearance",
					type: "dots",
					_meta: {
						_params: {
							maxDots: calculateTraitRating
						},
						description: "raw physical strength"
					}
				}
			}
		},
		mental: {
			label: "Mental",
			type: "sectionColumn",
			fields: {
				perception: {
					label: "Perception",
					type: "dots",
					_meta: {
						_params: {
							maxDots: calculateTraitRating
						},
						description: "raw physical strength"
					}
				},
				intelligence: {
					label: "Intelligence",
					type: "dots",
					_meta: {
						_params: {
							maxDots: calculateTraitRating
						},
						description: "raw physical strength"
					}
				},
				wits: {
					label: "Wits",
					type: "dots",
					_meta: {
						_params: {
							maxDots: calculateTraitRating
						},
						description: "raw physical strength"
					}
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
					type: "dots",
					_meta: {
						_params: {
							maxDots: calculateTraitRating
						},
						description: "raw physical strength"
					}
				},
				athletics: {
					label: "Athletics",
					type: "dots",
					_meta: {
						_params: {
							maxDots: calculateTraitRating
						},
						description: "raw physical strength"
					}
				},
				awareness: {
					label: "Awareness",
					type: "dots",
					_meta: {
						_params: {
							maxDots: calculateTraitRating
						},
						description: "raw physical strength"
					}
				},
				brawl: {
					label: "Brawl",
					type: "dots",
					_meta: {
						_params: {
							maxDots: calculateTraitRating
						},
						description: "raw physical strength"
					}
				},
				empathy: {
					label: "Empathy",
					type: "dots",
					_meta: {
						_params: {
							maxDots: calculateTraitRating
						},
						description: "raw physical strength"
					}
				},
				expression: {
					label: "Expression",
					type: "dots",
					_meta: {
						_params: {
							maxDots: calculateTraitRating
						},
						description: "raw physical strength"
					}
				},
				intimidation: {
					label: "Intimidation",
					type: "dots",
					_meta: {
						_params: {
							maxDots: calculateTraitRating
						},
						description: "raw physical strength"
					}
				},
				leadership: {
					label: "Leadership",
					type: "dots",
					_meta: {
						_params: {
							maxDots: calculateTraitRating
						},
						description: "raw physical strength"
					}
				},
				streetwise: {
					label: "Streetwise",
					type: "dots",
					_meta: {
						_params: {
							maxDots: calculateTraitRating
						},
						description: "raw physical strength"
					}
				},
				subterfuge: {
					label: "Subterfuge",
					type: "dots",
					_meta: {
						_params: {
							maxDots: calculateTraitRating
						},
						description: "raw physical strength"
					}
				}
			}
		},
		skills: {
			label: "Skills",
			type: "sectionColumn",
			fields: {
				animalKen: {
					label: "Animal Ken",
					type: "dots",
					_meta: {
						_params: {
							maxDots: calculateTraitRating
						},
						description: "raw physical strength"
					}
				},
				crafts: {
					label: "Crafts",
					type: "dots",
					_meta: {
						_params: {
							maxDots: calculateTraitRating
						},
						description: "raw physical strength"
					}
				},
				drive: {
					label: "Drive",
					type: "dots",
					_meta: {
						_params: {
							maxDots: calculateTraitRating
						},
						description: "raw physical strength"
					}
				},
				etiquette: {
					label: "Etiquette",
					type: "dots",
					_meta: {
						_params: {
							maxDots: calculateTraitRating
						},
						description: "raw physical strength"
					}
				},
				firearms: {
					label: "Firearms",
					type: "dots",
					_meta: {
						_params: {
							maxDots: calculateTraitRating
						},
						description: "raw physical strength"
					}
				},
				larceny: {
					label: "Larceny",
					type: "dots",
					_meta: {
						_params: {
							maxDots: calculateTraitRating
						},
						description: "raw physical strength"
					}
				},
				melee: {
					label: "Melee",
					type: "dots",
					_meta: {
						_params: {
							maxDots: calculateTraitRating
						},
						description: "raw physical strength"
					}
				},
				performance: {
					label: "Performance",
					type: "dots",
					_meta: {
						_params: {
							maxDots: calculateTraitRating
						},
						description: "raw physical strength"
					}
				},
				stealth: {
					label: "Stealth",
					type: "dots",
					_meta: {
						_params: {
							maxDots: calculateTraitRating
						},
						description: "raw physical strength"
					}
				},
				survival: {
					label: "Survival",
					type: "dots",
					_meta: {
						_params: {
							maxDots: calculateTraitRating
						},
						description: "raw physical strength"
					}
				}
			}
		},
		knowledges: {
			label: "Knowledges",
			type: "sectionColumn",
			fields: {
				academics: {
					label: "Academics",
					type: "dots",
					_meta: {
						_params: {
							maxDots: calculateTraitRating
						},
						description: "raw physical strength"
					}
				},
				computer: {
					label: "Computer",
					type: "dots",
					_meta: {
						_params: {
							maxDots: calculateTraitRating
						},
						description: "raw physical strength"
					}
				},
				finance: {
					label: "Finance",
					type: "dots",
					_meta: {
						_params: {
							maxDots: calculateTraitRating
						},
						description: "raw physical strength"
					}
				},
				investigation: {
					label: "Investigation",
					type: "dots",
					_meta: {
						_params: {
							maxDots: calculateTraitRating
						},
						description: "raw physical strength"
					}
				},
				law: {
					label: "Law",
					type: "dots",
					_meta: {
						_params: {
							maxDots: calculateTraitRating
						},
						description: "raw physical strength"
					}
				},
				medicine: {
					label: "Medicine",
					type: "dots",
					_meta: {
						_params: {
							maxDots: calculateTraitRating
						},
						description: "raw physical strength"
					}
				},
				occult: {
					label: "Occult",
					type: "dots",
					_meta: {
						_params: {
							maxDots: calculateTraitRating
						},
						description: "raw physical strength"
					}
				},
				politics: {
					label: "Politice",
					type: "dots",
					_meta: {
						_params: {
							maxDots: calculateTraitRating
						},
						description: "raw physical strength"
					}
				},
				science: {
					label: "Science",
					type: "dots",
					_meta: {
						_params: {
							maxDots: calculateTraitRating
						},
						description: "raw physical strength"
					}
				},
				technology: {
					label: "Technology",
					type: "dots",
					_meta: {
						_params: {
							maxDots: calculateTraitRating
						},
						description: "raw physical strength"
					}
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
