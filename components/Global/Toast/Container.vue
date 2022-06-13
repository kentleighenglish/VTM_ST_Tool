<template>
	<div class="toastContainer">
		<div v-if="messages.length" class="toastContainer__messages">
			<GlobalToastMessage
				v-for="message in messages"
				:key="message.id"
				v-bind="message"
				@dismiss="onMessageDismiss"
			/>
		</div>
	</div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
	name: "GlobalToastContainer",
	computed: {
		...mapState({
			messages ({ toast: { messages = [] } }) {
				return [...messages].reverse();
			}
		})
	},
	methods: {
		...mapActions({
			dismissMessage: "toast/dismissMessage"
		}),
		onMessageDismiss (id) {
			this.dismissMessage({ id });
		}
	}
}
</script>
<style lang="scss">
.toastContainer {
	display: flex;
	position: fixed;
	z-index: 6;
	overflow: hidden;
	pointer-events: none;

	top: 0;
	left: 0;
	width: 100%;
	height: 100%;

	justify-content: flex-end;

	&__messages {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-end;

		padding: $gap;
		width: 350px;
	}
}
</style>
