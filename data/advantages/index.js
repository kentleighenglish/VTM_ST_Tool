import { getDisciplineDots } from "../_utils";
import * as clans from "../details/clans";
import * as disciplines from "./disciplines";
import * as backgrounds from "./backgrounds";

const disiplinesDotMeta = data => ({
	params: {
		maxDots: getDisciplineDots(data)
	},
	description: (name, dotIndex) => {
		let desc = null;
		const discipline = disciplines[name];

		if (discipline) {
			desc = discipline.description;
		}

		if (dotIndex) {
			const powerDesc = discipline.dots
				.filter(d => d.dot === dotIndex)
				.reduce((acc, dot) => ([
					...acc,
					`${dot.label}: ${dot.description}`
				]), []).join("\n");

			desc += `\n\n${powerDesc}`;
		}

		return desc;
	}
});

export default {
	label: "Advantages",
	type: "section",
	fields: {
		disciplines: {
			label: "Disciplines",
			type: "sectionColumn",
			fields: {
				list: {
					label: null,
					type: "dynamicField",
					meta: {
						params: {
							defaultFields: (data = {}) => {
								const clan = data?.details?.vampire?.clan;

								if (clan) {
									return Object.keys(clans[clan].disciplines || {}).reduce((acc, key) => ({
										...acc,
										[key]: {
											label: disciplines[key].label,
											type: "dots",
											default: null,
											meta: disiplinesDotMeta(data)
										}
									}), {});
								}

								return {};
							},
							fieldsMeta: (data = {}) => disiplinesDotMeta(data)
						},
						keyOptions: Object.keys(disciplines).reduce((acc, key) => ({
							...acc,
							[key]: disciplines[key].label
						}), {}),
						fieldType: "dots",
						description: null
					}
				}
			}
		},
		backgrounds: {
			label: "Backgrounds",
			type: "sectionColumn",
			fields: {
				list: {
					label: null,
					type: "dynamicField",
					meta: {
						params: {
							fieldsMeta: (data = {}) => ({
								params: {
									maxDots: 5
								}
							})
						},
						keyOptions: Object.keys(backgrounds).reduce((acc, key) => ({
							...acc,
							[key]: backgrounds[key].label
						}), {}),
						fieldType: "dots",
						description: null
					}
				}
			}
		},
		virtues: {
			label: "Virtues",
			type: "sectionColumn",
			fields: {
				conscienceConviction: {
					label: "Conscience / Conviction",
					type: "dots",
					meta: {
						params: {
							maxDots: () => 5
						}
					}
				},
				selfControl: {
					label: "Self-Control / Instinct",
					type: "dots",
					meta: {
						params: {
							maxDots: () => 5
						}
					}
				},
				courage: {
					label: "Courage",
					type: "dots",
					meta: {
						params: {
							maxDots: () => 5
						}
					}
				}
			}
		}
	}
}
