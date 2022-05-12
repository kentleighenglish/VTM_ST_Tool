import { calculateTraitRating } from "@/data/_utils";

export default {
	label: "Politics",
	type: "dots",
	meta: {
		params: {
			maxDots: calculateTraitRating
		},
		description: "raw physical strength"
	}
}
