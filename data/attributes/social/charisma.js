import { calculateTraitRating } from "@/data/_utils";

export default {
	label: "Charisma",
	type: "dots",
	_meta: {
		_params: {
			maxDots: calculateTraitRating
		},
		description: "raw physical strength"
	}
}
