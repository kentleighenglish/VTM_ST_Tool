import { sheetSkeleton } from "@/data/chardata";

export const title = "Character Attributes";

export const subtitle = "Please select your primary, secondary, and tertiary attributes";

export const fields = sheetSkeleton.attributes;

export const stageComplete = ({ sheet }) => {
	return (
		true
	)
}
