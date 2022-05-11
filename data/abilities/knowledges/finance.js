import { calculateTraitRating } from "@/data/_utils";

export default {
	label: "Finance",
	type: "dots",
	meta: {
		params: {
			maxDots: calculateTraitRating
		},
		description: "raw physical strength"
	}
}
