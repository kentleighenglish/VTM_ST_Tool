<template>
	<div class="toastContainer">
		<div class="toastContainer__messages">
			<GlobalToastMessage v-for="message in messages" :key="message.id" v-bind="message" />
		</div>
	</div>
</template>
<script>
import { mapState } from "vuex";

export default {
	name: "GlobalToastContainer",
	computed: {
		...mapState({
			messages ({ toast: { messages = [] } }) {
				return messages;
			}
		})
	}
}
</script>
<style lang="scss">
.toastContainer {
	display: flex;
	position: absolute;
	z-index: 6;

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
