import { calculateTraitRating } from "@/data/_utils";

export default {
	label: "Stamina",
	type: "dots",
	meta: {
		params: {
			maxDots: calculateTraitRating
		},
		description: "raw physical strength"
	}
}
