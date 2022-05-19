import { getTraitDots } from "@/data/_utils";

export default {
	label: "Survival",
	type: "dots",
	meta: {
		params: {
			maxDots: getTraitDots
		},
		description: "raw physical strength"
	}
}
