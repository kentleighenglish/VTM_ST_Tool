import { calculateTraitRating } from "@/data/_utils";

export default {
	label: "Politice",
	type: "dots",
	meta: {
		params: {
			maxDots: calculateTraitRating
		},
		description: "raw physical strength"
	}
}
