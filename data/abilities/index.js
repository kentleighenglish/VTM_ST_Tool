import * as talents from "./talents";
import * as skills from "./skills";
import * as knowledges from "./knowledges";

export default {
	label: "Abilities",
	type: "section",
	fields: {
		talents: {
			label: "Talents",
			type: "sectionColumn",
			fields: talents
		},
		skills: {
			label: "Skills",
			type: "sectionColumn",
			fields: skills
		},
		knowledges: {
			label: "Knowledges",
			type: "sectionColumn",
			fields: knowledges
		}
	}
}
