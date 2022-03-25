import { calculateTraitRating } from "@/data/_utils";

export default {
	label: "Animal Ken",
	type: "dots",
	_meta: {
		_params: {
			maxDots: calculateTraitRating
		},
		description: "raw physical strength"
	}
}
