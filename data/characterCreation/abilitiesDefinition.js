import humanize from "@/filters/humanize";

export const title = "Character Abilities";

export const subtitle = "Please select your primary, secondary, and tertiary abilities";

const getPriorityOptions = (priority = {}, field) => ["talents", "skills", "knowledges"]
	.filter((key) => {
		const selected = Object.values(priority);

		return !selected.includes(key) || priority[field] === key;
	})
	.reduce((acc, key) => ({ ...acc, [key]: humanize(key) }), {});

export const definitionFields = ({ abilityPriority }) => ({
	abilityPriority: {
		type: "section",
		fields: {
			primary: {
				label: "Primary Abilities",
				type: "select",
				default: null,
				options: getPriorityOptions(abilityPriority, "primary")
			},
			secondary: {
				label: "Secondary Abilities",
				type: "select",
				default: null,
				options: getPriorityOptions(abilityPriority, "secondary")
			},
			tertiary: {
				label: "Tertiary Abilities",
				type: "select",
				default: null,
				options: getPriorityOptions(abilityPriority, "tertiary")
			}
		}
	}
});

export const stageComplete = ({ sheet }, { abilityPriority = {} }) => {
	return (
		abilityPriority.primary &&
		abilityPriority.secondary &&
		abilityPriority.tertiary
	);
}

export const definitionChanged = form => ({
	...form,
	sheet: {
		...form.sheet,
		abilities: {}
	}
})
