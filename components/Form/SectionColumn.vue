<template>
	<div class="formSectionColumn">
		<h4 v-if="label" class="formSectionColumn__title">
			{{ label }}
		</h4>
		<FormFields
			v-if="fields"
			v-model="model"
			:fields="fields"
			:original-value="originalValue"
			class-name="formSectionColumn__content"
			:disable-meta-display="disableMetaDisplay"
			:create-mode="createMode"
			:admin-mode="adminMode"
			:xp-check="xpCheck"
			:xp-spend-update="xpSpendUpdate"
			:xp-spend-reset="xpSpendReset"
			:active-mods="activeMods"
			@input="handleChange"
		/>
	</div>
</template>
<script>
export default {
	name: "FormSectionColumn",
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
		value: {
			type: Object,
			default: () => ({})
		},
		originalValue: {
			type: Object,
			default: () => ({})
		},
		disableMetaDisplay: Boolean,
		createMode: Boolean,
		adminMode: Boolean,
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
			default: () => {}
		}
	},
	data: () => ({
		model: null
	}),
	watch: {
		value (v) {
			this.model = v;
		}
	},
	created () {
		this.model = this.value;
	},
	mounted () {
		this.model = this.value;
	},
	methods: {
		handleChange (value) {
			this.$emit("input", {
				...(this.model || {}),
				...(value || {})
			});
		}
	}
}
</script>
<style lang="scss">
	.formSectionColumn {
		padding: 0 $gap;
	}
</style>
