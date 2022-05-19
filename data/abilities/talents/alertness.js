import { getTraitDots, getMaxSpend, getAbilitiesCost } from "@/data/_utils";

export default {
	label: "Alertness",
	type: "dots",
	meta: {
		params: {
			maxDots: getTraitDots,
			maxSpendDots: getMaxSpend(getAbilitiesCost)
		},
		getXpCost: getAbilitiesCost,
		description: "raw physical strength"
	}
};
