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
							options: disciplines
						},
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
