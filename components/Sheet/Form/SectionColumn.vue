<template>
	<div class="formSectionColumn">
		<h4 v-if="label" class="formSectionColumn__title">
			{{ label }}
		</h4>
		<SheetFormFields
			v-if="fields"
			v-model="model"
			:fields="fields"
			class-name="formSectionColumn__content"
			@input="handleChange"
		/>
	</div>
</template>
<script>
export default {
	name: "SheetFormSectionColumn",
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
