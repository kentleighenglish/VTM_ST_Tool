import { getTraitDots, getMaxSpend, getAbilitiesCost } from "@/data/_utils";

export default {
	label: "Athletics",
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
