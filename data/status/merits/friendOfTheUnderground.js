
export const label = "Friend of the Underground";

export const type = "social";

export const cost = 3;

export const relatedStats = [
	"dexterity",
	"perception",
	"intelligence",
	"stealth",
	"investigation",
	"wits",
	"charisma",
	"manipulation"
];

export const rollModifier = () => ({
	difficulty: -1,
	pool: 0
});

export const description = "While you’re not a Nosferatu, you know your way around the sewers, tunnels, ducts, subway tubes, and other subterranean passages of your hometown. The local Nosferatu (and any other creatures dwelling down in the muck) may not actually like you, but they’re not inclined to kill you on sight when they see you in their territory. You are at -1 difficulty on any rolls involving the subterranean world (sneaking from place to place underground, finding routes into sub-basements, and so on). Nosferatu cannot purchase this Merit.";
