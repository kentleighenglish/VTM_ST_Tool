import { getMaxSpend } from "../_utils";

const getHumanityCost = ({ current, target }) => {
	let xp = 0;
	for (let i = current; i < target; i++) {
		xp += i * 2;
	}

	return xp;
}

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
							maxDots: () => 10
						}
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
				}
			}
		},
		health: {
			label: "Health",
			type: "sectionColumn",
			fields: {}
		}
	}
}
