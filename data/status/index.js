import { getMaxSpend } from "../_utils";

const getHumanityCost = ({ current, target }) => {
	let xp = 0;
	for (let i = current; i < target; i++) {
		xp += i * 2;
	}

	return xp;
}

const getWillpowerCost = ({ current, target }) => {
	let xp = 0;
	for (let i = current; i < target; i++) {
		xp += i;
	}

	return xp;
}

export const healthLevels = [
	{ label: "Bruised", dicePoolMod: 0 },
	{ label: "Hurt", dicePoolMod: -1 },
	{ label: "Injured", dicePoolMod: -1 },
	{ label: "Wounded", dicePoolMod: -2 },
	{ label: "Mauled", dicePoolMod: -2 },
	{ label: "Crippled", dicePoolMod: -5 },
	{ label: "Incapacitated", dicePoolMod: 0 }
];

export default {
	label: null,
	type: "section",
	fields: {
		meritsFlaws: {
			label: "Merits & Flaws",
			type: "sectionColumn",
			fields: {}
		},
		condition: {
			label: "Humanity/Path",
			type: "sectionColumn",
			fields: {
				humanityPath: {
					label: "Humanity/Path",
					type: "dots",
					meta: {
						params: {
							maxDots: () => 10,
							maxSpendDots: getMaxSpend(getHumanityCost)
						},
						getXpCost: getHumanityCost
					}
				},
				bearing: {
					label: "Bearing",
					type: "select",
					options: {}
				},
				willpower: {
					label: "Willpower",
					type: "dots",
					meta: {
						params: {
							maxDots: () => 10,
							maxSpendDots: getMaxSpend(getWillpowerCost)
						},
						getXpCost: getWillpowerCost
					}
				},
				willpowerStatus: {
					label: null,
					type: "statusDots",
					meta: {
						params: {
							maxDots: data => data?.status?.condition?.willpower || 10
						}
					}
				},
				bloodPool: {
					label: "Blood Pool",
					type: "statusDots",
					meta: {
						params: {
							maxDots: () => 40
						}
					}
				}
			}
		},
		other: {
			label: null,
			type: "sectionColumn",
			fields: {
				health: {
					label: "Health",
					type: "healthDots",
					meta: {}
				},
				weakness: {
					label: "Weakness",
					type: "textarea"
				}
			}
		}
	}
}
