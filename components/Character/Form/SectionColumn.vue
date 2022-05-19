<template>
	<div class="formSectionColumn">
		<h4 v-if="label" class="formSectionColumn__title">
			{{ label }}
		</h4>
		<CharacterFormFields
			v-if="fields"
			v-model="model"
			:fields="fields"
			class-name="formSectionColumn__content"
			:create-mode="createMode"
			:xp-check="xpCheck"
			:xp-spend-update="xpSpendUpdate"
			@input="handleChange"
		/>
	</div>
</template>
<script>
export default {
	name: "CharacterFormSectionColumn",
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
		createMode: Boolean,
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
