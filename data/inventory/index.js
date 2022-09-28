// import { getMaxSpend } from "../_utils";
// import humanize from "@/filters/humanize";
import { v4 as uuidv4 } from "uuid";
import * as weapons from "./weapons";
import * as equipment from "./equipment";

const options = {
	...weapons,
	...equipment
};

export default {
	label: "Inventory",
	type: "section",
	meta: {
		singleColumn: true
	},
	fields: {
		equipment: {
			label: null,
			type: "table",
			disableMetaDisplay: true,
			meta: {
				getXpAddCost: () => 0,
				addOptions: () => {
					return Object.keys(options).reduce((acc, key) => ({
						...acc,
						[key]: options[key].label
					}), {})
				},
				createItem: (key) => {
					return {
						id: uuidv4(),
						key,
						equipped: true
					};
				},
				columns: {
					name: {
						label: "Item Name",
						parser: (val, row) => {
							const option = options[row.key] || {};

							return option.label;
						}
					},
					description: {
						label: "Description",
						parser: (val, row) => {
							const option = options[row.key] || {};

							return (option.description || "").substring(0, 50);
						}
					},
					additional: {
						label: "Additional",
						parser: (val, row) => {
							const option = options[row.key] || {};

							return option.stats;
						}
					},
					equipped: {
						label: "Equipped",
						parser: (val, row, h, triggers) => {
							return h("FormInput", {
								on: {
									input: (e) => {
										triggers.updateItem({
											...row,
											equipped: !!e
										});
									}
								},
								props: {
									type: "checkbox",
									value: val,
									disableReset: true,
									disableMetaDisplay: true
								}
							}, null);
						}
					},
					actions: {
						label: "",
						key: null,
						actions: item => ([
							{
								label: h => h("span", { class: "icon" }, "cancel"),
								key: "removeItem"
							}
						])
					}
				}
			}
		}
	}
}
