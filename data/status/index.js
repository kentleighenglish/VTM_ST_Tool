export default {
	label: null,
	type: "section",
	fields: {
		talents: {
			label: "Merits & Flaws",
			type: "sectionColumn",
			fields: {}
		},
		skills: {
			label: "Humanity/Path",
			type: "sectionColumn",
			fields: {
				humanityPath: {
					label: "Humanity/Path",
					type: "dots",
					meta: {
						params: {
							maxDots: () => 10
						}
					}
				},
				bearing: {
					label: "Bearing",
					type: "select",
					options: {}
				}
			}
		},
		knowledges: {
			label: "Health",
			type: "sectionColumn",
			fields: {}
		}
	}
}
