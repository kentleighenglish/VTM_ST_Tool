import { calculateTraitRating } from "@/data/_utils";

export default {
	label: "Brawl",
	type: "dots",
	meta: {
		params: {
			maxDots: calculateTraitRating
		},
		description: "raw physical strength"
	}
}
