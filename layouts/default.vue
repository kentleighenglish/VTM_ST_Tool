<template>
	<div class="layout">
		<Nuxt v-if="connected && hasEvents" />
		<CommonLoading v-else mode="page" />
	</div>
</template>
<script lang="ts">
import { mapState, mapActions } from "vuex";

export default {
	name: "DefaultLayout",
	computed: {
		...mapState({
			connected ({ socket: { connected } }) {
				return connected;
			},
			hasEvents ({ socket: { events } }) {
				return events && Object.keys(events).length;
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
<style lang="scss">
.layout {
	height: 100%;
	min-height: 100%;
}
</style>
