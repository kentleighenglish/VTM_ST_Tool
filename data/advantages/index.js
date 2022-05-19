import { getDisciplineDots, getMaxSpend, getDisciplineCost } from "../_utils";
import * as clans from "../details/clans";
import * as disciplines from "./disciplines";
import * as backgrounds from "./backgrounds";

const getDisciplineCostClan = (clanDisciplines = []) => ({ current, target, propPath }) => {
	const disciplineName = propPath[propPath.length - 1];
	const clanDiscipline = clanDisciplines.includes(disciplineName);

	return getDisciplineCost({ current, target, clanDiscipline });
}

const disciplinesDotMeta = (data, additional) => ({
	params: {
		maxDots: getDisciplineDots(data),
		maxSpendDots: getMaxSpend(getDisciplineCostClan(additional.clanDisciplines))(data, additional)
	},
	getXpCost: getDisciplineCostClan(additional.clanDisciplines),
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
							defaultFields: (data = {}, additional = {}) => {
								const clan = data?.details?.vampire?.clan;
								const clanDisciplines = Object.keys(clans[clan]?.disciplines || {});

								if (clan) {
									return clanDisciplines.reduce((acc, key) => ({
										...acc,
										[key]: {
											label: disciplines[key].label,
											type: "dots",
											default: null,
											meta: (data, additional = {}) => {
												const { propPath } = additional
												const newPropPath = [...propPath].push(key);

												return disciplinesDotMeta(data, { ...additional, propPath: newPropPath, clanDisciplines })
											}
										}
									}), {});
								}

								return {};
							},
							fieldsMeta: (data = {}, { propPath, ...additional } = { propPath: [] }) => (fieldName) => {
								const clan = data?.details?.vampire?.clan;
								const clanDisciplines = Object.keys(clans[clan]?.disciplines || {});
								const newPropPath = [...propPath];
								newPropPath.push(fieldName);

								return disciplinesDotMeta(data, { ...additional, propPath: newPropPath, clanDisciplines })
							}
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
							fieldsMeta: (data = {}) => () => ({
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
