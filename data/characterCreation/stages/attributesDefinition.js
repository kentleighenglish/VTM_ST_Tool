import humanize from "@/filters/humanize";

export const title = "Character Attributes";

export const subtitle = "Please select your primary, secondary, and tertiary attributes";

const getPriorityOptions = (priority = {}, field) => ["physical", "social", "mental"]
	.filter((key) => {
		const selected = Object.values(priority);

		return !selected.includes(key) || priority[field] === key;
	})
	.reduce((acc, key) => ({ ...acc, [key]: humanize(key) }), {});

export const definitionFields = ({ attributePriority }) => ({
	attributePriority: {
		type: "section",
		fields: {
			primary: {
				label: "Primary Attribute",
				type: "select",
				default: null,
				options: getPriorityOptions(attributePriority, "primary")
			},
			secondary: {
				label: "Secondary Attribute",
				type: "select",
				default: null,
				options: getPriorityOptions(attributePriority, "secondary")
			},
			tertiary: {
				label: "Tertiary Attribute",
				type: "select",
				default: null,
				options: getPriorityOptions(attributePriority, "tertiary")
			}
		}
	}
});

export const stageComplete = ({ sheet }, { attributePriority = {} }) => {
	return (
		attributePriority.primary &&
		attributePriority.secondary &&
		attributePriority.tertiary
	);
}

export const definitionChanged = form => ({
	...form,
	sheet: {
		...form.sheet,
		attributes: {}
	}
})
