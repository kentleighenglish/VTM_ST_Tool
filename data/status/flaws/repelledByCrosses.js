
export const label = "Repelled by Crosses";

export const type = "supernatural";

export const cost = -3;

export const relatedStats = [];

export const rollModifier = () => ({
	difficulty: 0,
	pool: 0
});

export const description = "You are repelled by the sight of ordinary crosses, believing them to be symbols of holy might. When confronted by a cross, you must make a Willpower roll (difficulty 9) or flee from the symbol for the duration of the scene. If you botch the roll, not only must you attempt to flee, but the touch of the cross can cause aggravated damage (one health level of damage per turn that the cross touches your skin). This damage cannot be soaked, even if the vampire possesses Fortitude.";
