<template>
	<div class="layout__default">
		<GlobalNav v-if="adminMode && connected && hasEvents" />
		<div v-if="connected && hasEvents" class="content">
			<Nuxt />
		</div>
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
			},
			adminMode ({ adminMode }) {
				return adminMode;
			}
		})
	},
	mounted () {
		this.addSocket({ socket: this.$socket });

		this.$socket().connect();

		const adminMode = localStorage.getItem("admin");

		this.setAdminMode(!!adminMode);
	},
	methods: {
		...mapActions({
			setAdminMode: "setAdminMode",
			addSocket: "socket/addSocket"
		})
	}
};
</script>
<style lang="scss">
.layout__default {
	height: 100%;
	min-height: 100%;

	.content {
		padding: $gap ($gap * 2);
		height: 100%;
	}
}
</style>
