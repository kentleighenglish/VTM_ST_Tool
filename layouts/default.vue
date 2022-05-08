<template>
	<div class="layout">
		<Nuxt />
	</div>
</template>
<script lang="ts">
import { mapState, mapActions } from "vuex";

export default {
	name: "defaultLayout",
	computed: {
		...mapState({

		})
	},
	mounted () {
		this.addSocket(this.$socket);

		this.$socket().connect();

		// this.initSet();
	},
	methods: {
		...mapActions({
			addSocket: "socket/addSocket"
		})
	}
};
</script>
