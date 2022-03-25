import { calculateTraitRating } from "@/data/_utils";

export default {
	label: "Strength",
	type: "dots",
	_meta: {
		_params: {
			maxDots: calculateTraitRating
		},
		description: `Strength is the raw, brute power of a character.
		It governs how much weight a character can lift, how
		much he can physically push, and how hard he can
		hit another character or object. The Strength Trait is
		added to a character’s damage dice pool when he hits
		his opponent in hand-to-hand combat. It is also used
		when a character wishes to break, lift, or carry something,
		as well as when a character tries to jump a distance.`
	}
}
