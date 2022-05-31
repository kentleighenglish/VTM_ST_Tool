<template>
	<div class="layout__default">
		<GlobalNav v-if="connected && hasEvents" />
		<GlobalNoticeBanner />
		<GlobalToastContainer />
		<div v-if="connected && hasEvents" class="content">
			<Nuxt />
		</div>
		<CommonLoading v-else mode="page" />
		<portal-target v-show="visibleModal" name="modal" class="modalContainer" />
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
			},
			visibleModal ({ visibleModal }) {
				return !!visibleModal
			},
			modalData ({ modalData = {} }) {
				return modalData;
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
					body: `Reconnecting: ${error.message || error}`
				});
			});
			socketIo.on("disconnect", (reason) => {
				this.updateSocketStatus({ connected: false, error: reason });
				this.pushMessage({
					type: "error",
					body: `Connection Lost: ${reason}`
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
	display: flex;
	min-height: 100vmin;
	position: relative;
	flex-direction: column;

	.content {
		display: flex;
		height: 100%;
		padding: $gap ($gap * 2);
		flex-grow: 1;

		> div {
			width: 100%;
			flex-grow: 1;
		}
	}
}

.modalContainer {
	position: fixed;
	z-index: 9999;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
</style>
