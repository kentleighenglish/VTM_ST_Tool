
export const label = "Code of Honor";

export const type = "mental";

export const cost = 2;

export const relatedStats = [
	"willpower",
	"appearance",
	"conscienceConviction",
	"selfControl",
	"courage"
];

export const rollModifier = () => ({
	difficulty: 0,
	pool: 2
});

export const description = "You have a personal code of ethics to which you adhere. The specifics of this code must be worked out with the Storyteller prior to play, and the character must follow it strictly. Characters with this Merit gain two additional dice to all Willpower or Virtue rolls when acting in accordance with their code (e.g., defending the helpless) or when attempting to avoid situations that might force them to violate their code.";
