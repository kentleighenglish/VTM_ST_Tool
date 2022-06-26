import { sheetSkeleton } from "@/data/chardata";

// Attribute 5 per dot
// Ability 2 per dot
// Discipline 7 per dot
// Background 1 per dot
// Virtue 2 per dot
// Humanity/Path 2 per dot
// Willpower 1 per dot

export const title = "Character Freebies";

export const subtitle = "Spend your freebie points to wrap up character creation.";

export const fields = {
	attributes: sheetSkeleton.attributes,
	abilities: sheetSkeleton.abilities,
	advantages: sheetSkeleton.advantages
};
