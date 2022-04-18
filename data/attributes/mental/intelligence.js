import { calculateTraitRating } from "@/data/_utils";

export default {
	label: "Intelligence",
	type: "dots",
	meta: {
		params: {
			maxDots: calculateTraitRating
		},
		description: "raw physical strength"
	}
}
