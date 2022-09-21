<template>
	<div class="st-padding">
		<CommonButton @click="adminOn">
			Switch Admin On
		</CommonButton>
		<CommonButton @click="onClearCache">
			Clear Cache
		</CommonButton>
		<FormInput :disableReset="true" :disableMetaDisplay="true" v-model="cacheName" />
	</div>
</template>
<script>
import { mapActions } from "vuex";

export default {
	name: "PageAdmin",
	data: () => ({
		cacheName: ""
	}),
	methods: {
		...mapActions({
			setAdminMode: "setAdminMode",
			clearCache: "clearCache"
		}),
		adminOn () {
			localStorage.setItem("admin", true);

			this.setAdminMode(true);
		},
		onClearCache () {
			if (this.cacheName && this.cacheName.length) {
				this.clearCache({ name: this.cacheName });
			}
		}
	}
}
</script>
