<template>
	<div :class="componentClass">
		<div class="noticeBanner__text">
			{{ noticeText }}
		</div>
	</div>
</template>
<script>
import { mapState } from "vuex";
import classModsMixin from "@/mixins/classModsMixin";

export default {
	name: "GlobalNoticeBanner",
	mixins: [classModsMixin],
	classMod: {
		baseClass: "noticeBanner",
		modifiers: {
			updateAvailable: vm => vm.updateAvailable,
			beingViewed: vm => !vm.updateAvailable && vm.otherConnections.length > 0,
			visible: vm => (vm.updateAvaiable || vm.otherConnections.length)
		}
	},
	computed: {
		...mapState({
			socket ({ socket: { socket } }) {
				return socket();
			},
			updateAvailable ({ socket: { roomData } }) {
				return roomData.updateAvailable;
			},
			otherConnections ({ socket: { socket, roomData } }) {
				return roomData.sockets.filter(s => s !== socket().id);
			}
		}),
		noticeText () {
			if (this.updateAvailable) {
				return "This character sheet has been updated";
			}

			if (this.otherConnections.length) {
				return "Someone else is viewing this character sheet";
			}

			return null;
		}
	}
}
</script>
<style lang="scss">
	.noticeBanner {
		position: absolute;
		display: flex;
		top: 100%;
		left: 0;
		width: 100%;

		align-items: center;
		padding: math.div($gap, 4) $gap * 2;
		font-size: 0.9em;
		transform: translateY(-100%);
		transition: background-color 0.3s, transform 0.3s;

		@include realShadow();

		&--visible {
			transform: translateY(0%);
		}

		&--updateAvailable {
			background-color: $warning;
		}

		&--beingViewed {
			background-color: $grey-light;
			color: $grey-dark;
		}
	}
</style>
