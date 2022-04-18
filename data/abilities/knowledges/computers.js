import { calculateTraitRating } from "@/data/_utils";

export default {
	label: "Computer",
	type: "dots",
	meta: {
		params: {
			maxDots: calculateTraitRating
		},
		description: "raw physical strength"
	}
}
