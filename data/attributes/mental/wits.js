import { calculateTraitRating } from "@/data/_utils";

export default {
	label: "Wits",
	type: "dots",
	meta: {
		params: {
			maxDots: calculateTraitRating
		},
		description: "raw physical strength"
	}
}
