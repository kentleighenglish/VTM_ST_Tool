<template>
	<div class="formSection">
		<h3 v-if="label" class="formSection__title">
			{{ label }}
		</h3>
		<CharacterFormFields
			v-if="fields"
			v-model="model"
			:fields="fields"
			class-name="formSection__content"
			:create-mode="createMode"
			:xp-check="xpCheck"
			:xp-spend-update="xpSpendUpdate"
			@input="handleChange($event)"
		/>
	</div>
</template>
<script>
export default {
	name: "CharacterFormSection",
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
				...value
			});
		}
	}
}
</script>
<style lang="scss">
	.formSection {
		display: flex;
		flex-direction: column;

		&__title {
			text-align: center;
		}

		&__content {
			display: grid;
			grid-template-areas: ". . .";
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
</style>
