import { calculateTraitRating } from "@/data/_utils";

export default {
	label: "Dexterity",
	type: "dots",
	meta: {
		params: {
			maxDots: calculateTraitRating
		},
		description: "raw physical strength"
	}
}
