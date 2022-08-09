<script>
export default {
	props: {
		column: {
			type: Object,
			default: () => ({})
		},
		colKey: {
			type: String,
			default: null
		},
		row: {
			type: Object,
			default: () => ({})
		}
	},
	methods: {
		parseColumn (h) {
			const val = this.row[this.column.key || this.colKey];

			if (this.column.parser) {
				return this.column.parser(val, this.row, h);
			}

			return val;
		},
		generateActions (h) {
			return this.column.actions(this.row).map(action => h(
				action.to ? "router-link" : "span",
				{
					class: "table__action",
					on: !action.to && { click: () => this.triggerAction(action.func) },
					props: {
						to: action.to
					}
				},
				action.label
			));
		},
		triggerAction (func) {
			this.$emit("actionTrigger", { func, row: this.row });
		}
	},
	render (h) {
		const col = this.column;
		const isDefault = (!col.actions && (!col.key || (col.key && col.key !== null)));

		let content = null;
		if (isDefault) {
			content = this.parseColumn(h);
		} else {
			const actions = this.generateActions(h);

			content = h("div", { class: "table__actions" }, actions);
		}

		return h("td", {}, [
			content
		]);
	}
}
</script>
