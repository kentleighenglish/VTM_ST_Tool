
export const rollDice = (poolCount) => {
	const output = [];
	for (let i = 0; i < poolCount; i++) {
		output.push(Math.ceil(Math.random() * 10));
	}

	return output;
}
