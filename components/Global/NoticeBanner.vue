<template>
	<div :class="componentClass">
		<CommonSticky :offset-top="0">
			<div class="noticeBanner__inner">
				{{ noticeText }}
			</div>
		</CommonSticky>
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
				return "This character sheet has been updated by someone else";
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
		position: relative;
		width: 100%;
		margin-bottom: 0px;
		transition: margin-bottom 0.3s;
		z-index: 2;

		.stickyBlock {
			width: 100%;
		}

		&--visible {
			margin-bottom: 30px;
		}

		&__inner {
			position: absolute;
			display: flex;
			top: 100%;
			width: 100%;
			left: 0;

			align-items: center;
			padding: math.div($gap, 4) $gap * 2;
			font-size: 0.9em;
			transform: translateY(-100%);
			transition: background-color 0.3s, transform 0.3s;

			@include realShadow();

			.noticeBanner--visible & {
				transform: translateY(0%);
			}

			.noticeBanner--updateAvailable & {
				background-color: $warning;
			}

			.noticeBanner--beingViewed & {
				background-color: $grey-light;
				color: $grey-darker;
			}
		}
	}
</style>
