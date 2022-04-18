import { calculateTraitRating } from "@/data/_utils";

export default {
	label: "Science",
	type: "dots",
	meta: {
		params: {
			maxDots: calculateTraitRating
		},
		description: "raw physical strength"
	}
}
