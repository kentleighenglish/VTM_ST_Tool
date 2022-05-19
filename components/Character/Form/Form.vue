<template>
	<div class="characterCharacterForm">
		<CharacterFormFields
			v-model="model"
			:fields="sheetData"
			:create-mode="createMode"
			:xp-check="xpCheck"
			:xp-spend-update="xpSpendUpdate"
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
		createMode: Boolean,
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
			const updateParams = (params) => {
				return Object.keys(params).reduce((acc, key) => ({
					...acc,
					[key]: params[key](
						this.model,
						{
							createMode: this.createMode,
							xpPoints: (this.xp?.availablePoints || 0)
						}
					)
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
