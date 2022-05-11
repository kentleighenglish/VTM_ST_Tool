
export const calculateTraitRating = (data) => {
	const gen = data?.details?.vampire?.generation || 10;

	if (gen > 7) {
		return 5;
	}

	const calculated = (5 + (8 - gen));

	return calculated > 10 ? 10 : calculated;
}

export const calculateDisciplineRating = (data) => {
	const gen = data?.details?.vampire?.generation || 10;

	if (gen > 7) {
		return 5;
	}

	const calculated = (5 + (8 - gen));

	return calculated > 10 ? 10 : calculated;
}
