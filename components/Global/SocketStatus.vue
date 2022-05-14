<template>
	<div :class="componentClass">
		<div class="socketStatus__connectionText">
			{{ socket.connected ? 'Connected' : 'Disconnected' }}
		</div>
		<div class="socketStatus__indicator" />
	</div>
</template>
<script>
import { mapState } from "vuex";
import classModsMixin from "@/mixins/classModsMixin";

export default {
	name: "GlobalSocketStatus",
	mixins: [classModsMixin],
	classMod: {
		baseClass: "socketStatus",
		modifiers: {
			connected: vm => vm.socket.connected,
			disconnected: vm => !vm.socket.connected
		}
	},
	computed: {
		...mapState({
			socket ({ socket: { socket } }) {
				return socket();
			}
		})
	}
}
</script>
<style lang="scss">
	.socketStatus {
		display: flex;
		align-items: center;
		padding: 0 $gap;

		&__connectionText {
			font-size: 0.8em;
			margin-right: math.div($gap, 2);
		}

		&__indicator {
			display: block;
			width: 14px;
			height: 14px;
			background: $grey-dark;
			border-radius: 50%;

			.socketStatus--connected & {
				background: saturate(lighten($success, 25%), 10%);
				box-shadow: inset 0px 0px 5px $success;
			}
		}
	}
</style>
