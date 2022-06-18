
export const label = "Protégé";

export const type = "social";

export const cost = 1;

export const relatedStats = ["charisma", "manipulation", "appearance"];

export const rollModifier = () => ({
	difficulty: -1,
	pool: 0
});

export const description = "Your sire watched you for some time before Embracing you, and spoke glowingly of you to acquaintances. These vampires may be inclined to look favorably on you by dint of your sire’s recommendation; you are at -1 difficulty on Social rolls with all those who’ve heard good things about you.";
