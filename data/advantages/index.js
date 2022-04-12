import * as clans from "../details/clans";
import * as disciplines from "./disciplines";

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
					_meta: {
						_params: {
							defaultFields: (data = {}) => {
								const clan = data?.details?.vampire?.clan;

								if (clan) {
									return Object.keys(clans[clan].disciplines || {});
								}

								return [];
							}
						},
						keyOptions: Object.keys(disciplines).reduce((acc, key) => ({
							...acc,
							[key]: "a"
						}), {}),
						fieldType: "dots",
						description: "raw physical strength"
					}
				}
			}
		},
		backgrounds: {
			label: "Backgrounds",
			type: "sectionColumn",
			fields: {}
		},
		virtues: {
			label: "Virtues",
			type: "sectionColumn",
			fields: {}
		}
	}
}
