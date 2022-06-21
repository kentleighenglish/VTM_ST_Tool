import { sheetSkeleton } from "@/data/chardata";

export const title = "Character Details";

export const subtitle = "Please add the character's general details and concept.";

export const fields = sheetSkeleton.details;

export const stageComplete = ({ sheet }, { characterType }) => {
	const isVampire = characterType === "vampire";

	return (
		!!sheet?.details?.info?.name &&
		!!sheet?.details?.info?.player &&
		!!sheet?.details?.info?.chronicle &&
		!!sheet?.details?.character?.nature &&
		!!sheet?.details?.character?.demeanor &&
		!!sheet?.details?.character?.concept &&
		(!isVampire || sheet?.details?.vampire?.clan) &&
		(!isVampire || sheet?.details?.vampire?.generation)
	)
}
