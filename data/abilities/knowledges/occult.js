import { calculateTraitRating } from "@/data/_utils";

export default {
	label: "Occult",
	type: "dots",
	meta: {
		params: {
			maxDots: calculateTraitRating
		},
		description: "raw physical strength"
	}
}
