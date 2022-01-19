<script>
import { generateFields } from "./formGenerator.js";

export default {
	name: "FormSection",
	props: {
		name: {
			type: String,
			default: null
		},
		label: {
			type: String,
			default: null
		},
		fields: {
			type: Object,
			default: () => ({})
		},
		onChange: {
			type: Function,
			default: () => {}
		}
	},
	methods: {
		handleChange: () => {

		}
	},
	render: (h) => {
		const content = [];
		if (this.label) {
			content.push(h("div", { attrs: { class: "form__sectionColumnLabel" } }));
		}

		content.push(h("div", { attrs: { class: "form__sectionColumnContent" } }, generateFields(h, this.fields || {})));

		return h("div", { attrs: { class: "form__sectionColumn" } }, content);
	}
}
</script>
