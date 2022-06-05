<template>
	<div class="formStatic">
		{{ staticText }}
	</div>
</template>
<script>
export default {
	name: "FormStatic",
	props: {
		meta: {
			type: Object,
			default: () => ({})
		}
	},
	computed: {
		staticText () {
			if (this.meta?.params?.staticValue) {
				return this.meta?.params?.staticValue();
			}

			return null;
		}
	}
}
</script>
