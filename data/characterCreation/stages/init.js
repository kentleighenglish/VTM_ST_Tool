export const title = "Initial Definition";

export const subtitle = "Please add the character's general details and concept.";

export const defineFields = {
	characterType: {
		label: "Character Type",
		type: "select",
		default: null,
		options: {
			vampire: "Vampire",
			mortal: "Mortal",
			werewolf: "Werewolf",
			ghoul: "Ghoul",
			gargoyle: "Gargoyle"
		}
	}
}

export const stageComplete = (form, { characterType }) => {
	return (
		!!characterType
	)
}
