import { calculateTraitRating } from "@/data/_utils";

export default {
	label: "Alertness",
	type: "dots",
	meta: {
		params: {
			maxDots: calculateTraitRating
		},
		description: "raw physical strength"
	}
};
