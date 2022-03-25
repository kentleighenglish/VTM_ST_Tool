import * as physical from "./physical";
import * as social from "./social";
import * as mental from "./mental";

export default {
	label: "Attributes",
	type: "section",
	fields: {
		physical: {
			label: "Physical",
			type: "sectionColumn",
			fields: physical
		},
		social: {
			label: "Social",
			type: "sectionColumn",
			fields: social
		},
		mental: {
			label: "Mental",
			type: "sectionColumn",
			fields: mental
		}
	}
}
