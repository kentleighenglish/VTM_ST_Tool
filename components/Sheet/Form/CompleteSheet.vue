<template>
	<div class="characterSheetForm">
		<SheetFormFields v-model="model" :fields="sheetData" @input="updateValue($event)" />
	</div>
</template>
<script>
import { sheetSkeleton } from "@/data/chardata";

export default {
	name: "SheetFormCompleteSheet",
	props: {
		value: {
			type: Object,
			default: () => ({})
		},
		readOnly: Boolean
	},
	data: () => ({
		sheetData: {},
		model: {}
	}),
	watch: {
		value (v) {
			this.model = v;

			this.updateSheetFormData();
		}
	},
	created () {
		this.model = this.value;
	},
	mounted () {
		this.model = this.value;

		this.updateSheetFormData();
	},
	methods: {
		updateValue (value) {
			this.$emit("input", {
				...(this.data || {}),
				...(value || {})
			});

			this.updateSheetFormData();
		},
		updateSheetFormData () {
			const updateParams = (params) => {
				return Object.keys(params).reduce((acc, key) => ({
					...acc,
					[key]: params[key](this.model)
				}), {});
			}

			const parseObject = (obj) => {
				return Object.keys(obj).reduce((acc, key) => {
					const prop = obj[key];

					if (
						(typeof prop !== "object" || Array.isArray(prop)) ||
						(typeof prop === "object" && !prop)
					) {
						return {
							...acc,
							[key]: prop
						}
					}

					if (key === "params") {
						return {
							...acc,
							[key]: updateParams(prop)
						};
					} else {
						return {
							...acc,
							[key]: parseObject(prop)
						};
					}
				}, {});
			}

			this.sheetData = parseObject(sheetSkeleton);
		}
	}
}
</script>
