
export const label = "Disease Carrier";

export const type = "physical";

export const cost = -4;

export const relatedStats = [];

export const rollModifier = () => ({
	difficulty: 0,
	pool: 0
});

export const description = "Your blood carries a lethal and highly contagious disease. The disease can be anything from rabies to HIV, and Kindred who drink your blood have a 10% chance of becoming a carrier as well. You must spend an extrablood point each night on awakening, or you will begin manifesting symptoms of the disease (increased chance to frenzy for rabies, reduced soak rolls for HIV, etc.).";
