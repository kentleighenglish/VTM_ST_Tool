import { calculateTraitRating } from "@/data/_utils";

export default {
	label: "Etiquette",
	type: "dots",
	meta: {
		params: {
			maxDots: calculateTraitRating
		},
		description: "raw physical strength"
	}
}
