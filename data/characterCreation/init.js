import * as characterTypes from "./characterTypes";

export const title = "Initial Definition";

export const subtitle = "Please add the character's general details and concept.";

export const definitionFields = () => ({
	characterType: {
		label: "Character Type",
		type: "select",
		default: null,
		options: Object.keys(characterTypes).reduce((acc, key) => ({
			...acc,
			[key]: characterTypes[key].label
		}), {})
	}
});

export const stageComplete = (form, { characterType }) => {
	return (
		!!characterType
	)
}
