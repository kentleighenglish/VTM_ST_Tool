<template>
	<div class="layout__default">
		<GlobalNav v-if="connected && hasEvents" />
		<GlobalNoticeBanner />
		<GlobalToastContainer />
		<div v-if="connected && hasEvents" class="content">
			<Nuxt />
		</div>
		<CommonLoading v-else mode="page" />
	</div>
</template>
<script>
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

		const socketIo = this.$socket().connect();

		const adminMode = localStorage.getItem("admin");

		this.setAdminMode(!!adminMode);

		this.bindEvents(socketIo);
	},
	methods: {
		...mapActions({
			setAdminMode: "setAdminMode",
			addSocket: "socket/addSocket",
			addEvents: "socket/addEvents",
			updateSocketStatus: "socket/updateSocketStatus",
			triggerUpdate: "socket/triggerUpdate",
			pushMessage: "toast/pushMessage"
		}),
		bindEvents (socketIo) {
			socketIo.on("connect", () => {
				this.updateSocketStatus({ connected: true });
			});
			socketIo.on("connect_error", (error) => {
				this.updateSocketStatus({ connected: false, error });
				this.pushMessage({
					type: "error",
					body: error
				});
			});
			socketIo.on("disconnect", (reason) => {
				this.updateSocketStatus({ connected: false, error: reason });
				this.pushMessage({
					type: "error",
					body: reason
				});
			});
			socketIo.on("connectResponse", ({ events }) => {
				this.addEvents({ events });
			});
			socketIo.on("updateTriggered", ({ sockets = [], updateAvailable = false, xpUpdateAvailable = false }) => {
				this.triggerUpdate({ sockets, updateAvailable, xpUpdateAvailable });
			});
		}
	}
};
</script>
<style lang="scss">
.layout__default {
	min-height: 100%;
	position: relative;

	.content {
		padding: $gap ($gap * 2);
	}
}
</style>
