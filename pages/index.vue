<template>
	<LayoutDefault>
		<h1>Characters</h1>
		{{ sheets }}
	</LayoutDefault>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
	name: "IndexPage",
	computed: {
		...mapState({
			sheets ({ sheets: { sheets = [] } }) {
				return sheets;
			}
		})
	},
	methods: {
		...mapActions({
			loadAll: "sheets/loadAll"
		})
	}
}
</script>
