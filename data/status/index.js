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
							maxDots: () => 10
						}
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
