import { getTraitDots } from "@/data/_utils";

export default {
	label: "Investigation",
	type: "dots",
	meta: {
		params: {
			maxDots: getTraitDots
		},
		description: "raw physical strength"
	}
}
