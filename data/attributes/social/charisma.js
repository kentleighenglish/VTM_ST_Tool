import { getTraitDots, getAttributeCost, getMaxSpend } from "@/data/_utils";

export default {
	label: "Charisma",
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
