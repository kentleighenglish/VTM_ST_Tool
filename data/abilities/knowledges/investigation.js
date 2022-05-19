import { getTraitDots, getMaxSpend, getAbilitiesCost } from "@/data/_utils";

export default {
	label: "Investigation",
	type: "dots",
	meta: {
		params: {
			maxDots: getTraitDots,
			maxSpendDots: getMaxSpend(getAbilitiesCost)
		},
		description: "raw physical strength"
	}
}
