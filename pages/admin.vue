<template>
	<div class="st-padding">
		<CommonButton @click="adminOn">
			Switch Admin On
		</CommonButton>
	</div>
</template>
<script>
import { mapActions } from "vuex";

export default {
	name: "PageAdmin",
	methods: {
		...mapActions({
			setAdminMode: "setAdminMode"
		}),
		adminOn () {
			localStorage.setItem("admin", true);

			this.setAdminMode(true);
		}
	}
}
</script>
