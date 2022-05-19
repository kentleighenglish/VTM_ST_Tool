<template>
	<div class="metaContainer">
		<div
			ref="metaContainer"
			class="metaContainer__inner"
			v-html="metaText"
		/>
	</div>
</template>
<script>
import { mapState } from "vuex";

export default {
	name: "CharacterMetaContainer",
	computed: {
		...mapState({
			metaText ({ characters }) {
				return (characters.metaDisplay.text || "").replaceAll(/[\n\r]/g, "<br>");
			}
		})
	}
}
</script>
<style lang="scss">
.metaContainer {

	&__inner {
		padding: $gap;
		overflow-x: auto;
	}
}
</style>
