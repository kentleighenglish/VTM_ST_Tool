<template>
	<LayoutDefault>
		<h1>Characters</h1>
		<div class="st-flex">
			{{ sheets }}
		</div>
	</LayoutDefault>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
	name: "IndexPage",
	data: () => ({
		filter: {}
	}),
	computed: {
		...mapState({
			sheets ({ sheets: { sheets = [] } }) {
				return sheets;
			}
		})
	},
	mounted () {
		this.onLoad();
	},
	methods: {
		...mapActions({
			loadAll: "sheets/loadAll"
		}),
		onLoad () {
			this.loadAll({ filter: this.filter });
		}
	}
}
</script>
