import { getTraitDots } from "@/data/_utils";

export default {
	label: "Animal Ken",
	type: "dots",
	meta: {
		params: {
			maxDots: getTraitDots
		},
		description: "raw physical strength"
	}
}
