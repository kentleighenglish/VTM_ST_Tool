
export const label = "Deathsight";

export const type = "supernatural";

export const cost = -2;

export const relatedStats = ["perception"];

export const rollModifier = () => ({
	difficulty: 2,
	pool: 0
});

// @todo figure out how to manage the dynamic difficulty rolls
export const description = "Everything appears rotted and decayed to you. The world appears to you as a corpse; mortals look diseased or skeletal, buildings seem decrepit, and your fellow Kindred seem to be walking, moldering cadavers. You are at -2 difficulty to resist all rolls based on Appearance, but by the same token you are at +2 difficulty on all Perception-based rolls. In addition, you find social interaction difficult and are at +1 difficulty on all Social-based rolls.";
