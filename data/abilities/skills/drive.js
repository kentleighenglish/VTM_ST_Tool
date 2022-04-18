import { calculateTraitRating } from "@/data/_utils";

export default {
	label: "Drive",
	type: "dots",
	meta: {
		params: {
			maxDots: calculateTraitRating
		},
		description: "raw physical strength"
	}
}
