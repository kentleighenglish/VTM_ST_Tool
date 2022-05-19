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
	max-height: 100%;
	overflow: hidden;
	display: grid;

	grid-auto-columns: minmax(0, 1fr);

	&__inner {
		padding: $gap;
		overflow-x: auto;
	}
}
</style>
