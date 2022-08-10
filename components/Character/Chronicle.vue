<template>
	<div class="characterChronicle">
		<FormFields
			v-model="model"
			:fields="fields"
			@input="updateValue($event)"
		/>
	</div>
</template>
<script>
export default {
	name: "CharacterChronicle",
	props: {
		value: {
			type: Object,
			default: () => ({})
		}
	},
	data: () => ({
		model: {},
		fields: {
			showName: {
				label: "Show Name",
				type: "checkbox"
			},
			altName: {
				label: "Alternate Name",
				type: "text"
			}
		}
	}),
	created () {
		this.model = this.value;
	},
	mounted () {
		this.model = this.value;
	},
	methods: {
		updateValue (value) {
			this.$emit("input", {
				...(this.data || {}),
				...(value || {})
			});
		}
	}
}
</script>
<style lang="scss">
.characterChronicle {
	padding: $gap * 2 $gap;
}
</style>
