import { calculateTraitRating } from "@/data/_utils";

export default {
	label: "Animal Ken",
	type: "dots",
	meta: {
		params: {
			maxDots: calculateTraitRating
		},
		description: "raw physical strength"
	}
}
