<template>
	<LayoutDefault>
		<FormCharacterSheet v-model="formData" :read-only="readOnly" @input="onUpdate" />
	</LayoutDefault>
</template>
<script>

export default {
	name: "SheetsPage",
	data: () => ({
		sheetId: null,
		formData: {}
	}),
	mounted () {
		this.sheetId = this.$route?.params?.id;
	},
	computed: {
		readOnly () {
			return !!this.sheetId
		}
	},
	methods: {
		onUpdate (data) {
			this.formData = data;
		}
	}
}
</script>
