import { calculateTraitRating } from "./_utils";

export default {
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
