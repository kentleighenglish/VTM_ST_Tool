import { calculateTraitRating } from "@/data/_utils";

export default {
	label: "Technology",
	type: "dots",
	meta: {
		params: {
			maxDots: calculateTraitRating
		},
		description: "raw physical strength"
	}
}
