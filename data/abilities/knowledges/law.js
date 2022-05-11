import { calculateTraitRating } from "@/data/_utils";

export default {
	label: "Law",
	type: "dots",
	meta: {
		params: {
			maxDots: calculateTraitRating
		},
		description: "raw physical strength"
	}
}
