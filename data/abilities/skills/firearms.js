import { calculateTraitRating } from "@/data/_utils";

export default {
	label: "Firearms",
	type: "dots",
	meta: {
		params: {
			maxDots: calculateTraitRating
		},
		description: "raw physical strength"
	}
}
