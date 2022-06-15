<template>
	<div class="characterForm">
		<FormFields
			v-model="model"
			:fields="sheetData"
			:create-mode="createMode"
			:admin-mode="adminMode"
			:xp-check="xpCheck"
			:xp-spend-update="xpSpendUpdate"
			:xp-spend-reset="xpSpendReset"
			:original-value="originalValue"
			:active-mods="activeMods"
			@input="updateValue($event)"
		/>
	</div>
</template>
<script>
import { sheetSkeleton } from "@/data/chardata";

export default {
	name: "CharacterForm",
	props: {
		value: {
			type: Object,
			default: () => ({})
		},
		originalValue: {
			type: Object,
			default: () => ({})
		},
		createMode: Boolean,
		adminMode: Boolean,
		xp: {
			type: Object,
			default: () => ({})
		},
		xpCheck: {
			type: Function,
			default: () => {}
		},
		xpSpendUpdate: {
			type: Function,
			default: () => {}
		},
		xpSpendReset: {
			type: Function,
			default: () => {}
		},
		activeMods: {
			type: Object,
			default: () => ({})
		}
	},
	data: () => ({
		sheetData: {},
		model: {}
	}),
	watch: {
		value (v) {
			this.model = v;

			this.updateCharacterFormData();
		}
	},
	created () {
		this.model = this.value;
	},
	mounted () {
		this.model = this.value;

		this.updateCharacterFormData();
	},
	methods: {
		updateValue (value) {
			this.$emit("input", {
				...(this.data || {}),
				...(value || {})
			});

			this.updateCharacterFormData();
		},
		updateCharacterFormData () {
			const updateParams = (params, propPath = []) => {
				const parsedPropPath = propPath.filter(key => key !== "meta" && key !== "fields");

				return Object.keys(params).reduce((acc, key) => ({
					...acc,
					[key]: params[key](
						this.model,
						{
							createMode: this.createMode,
							adminMode: this.adminMode,
							xpPoints: (this.xp?.availablePoints || 0),
							propPath: parsedPropPath
						}
					)
				}), {});
			}

			const parseObject = (obj, propPath = []) => {
				return Object.keys(obj).reduce((acc, key) => {
					const prop = obj[key];
					const newPropPath = [...propPath];

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
						newPropPath.pop();
						return {
							...acc,
							[key]: updateParams(prop, newPropPath)
						};
					} else {
						newPropPath.push(key);
						return {
							...acc,
							[key]: parseObject(prop, newPropPath)
						};
					}
				}, {});
			}

			this.sheetData = parseObject(sheetSkeleton);
		}
	}
}
</script>
