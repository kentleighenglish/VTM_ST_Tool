import { calculateTraitRating } from "@/data/_utils";

export default {
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
