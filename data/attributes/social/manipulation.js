import { getTraitDots, getAttributeCost, getMaxSpend } from "@/data/_utils";

export default {
	label: "Manipulation",
	type: "dots",
	meta: {
		params: {
			maxDots: getTraitDots,
			maxSpendDots: getMaxSpend(getAttributeCost)
		},
		getXpCost: getAttributeCost,
		description: "raw physical strength"
	}
}
