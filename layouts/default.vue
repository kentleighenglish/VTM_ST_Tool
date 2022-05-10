<template>
	<div class="layout">
		<Nuxt v-if="connected" />
	</div>
</template>
<script lang="ts">
import { mapState, mapActions } from "vuex";

export default {
	name: "defaultLayout",
	computed: {
		...mapState({
			connected ({ socket: { connected } }) {
				return connected;
			}
		})
	},
	mounted () {
		this.addSocket({ socket: this.$socket });

		this.$socket().connect();
	},
	methods: {
		...mapActions({
			addSocket: "socket/addSocket"
		})
	}
};
</script>
