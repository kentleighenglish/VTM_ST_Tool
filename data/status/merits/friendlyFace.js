
export const label = "Friendly Face";

export const type = "physical";

export const cost = 1;

export const relatedStats = ["charisma", "manipulation", "appearance"];

export const rollModifier = () => ({
	difficulty: -1,
	pool: 0
});

export const description = "You have a face that reminds everyone of someone, to the point where strangers are inclined to be well inclined toward you because of it. The effect doesn’t fade even if you explain the “mistake,” leaving you at -1 difficulty on all appropriate Social-based rolls (yes for Seduction, no for Intimidation, for example) when a stranger is involved. This Merit only functions on a first meeting.";
