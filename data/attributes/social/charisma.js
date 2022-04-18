import { calculateTraitRating } from "@/data/_utils";

export default {
	label: "Charisma",
	type: "dots",
	meta: {
		params: {
			maxDots: calculateTraitRating
		},
		description: "raw physical strength"
	}
}
