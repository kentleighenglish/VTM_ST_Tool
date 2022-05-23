<template>
	<div class="metaContainer">
		<div v-if="meta.description" class="metaContainer__shortDescription">
			<CommonMarkdown>{{ meta.shortDescription }}</CommonMarkdown>
		</div>
		<div v-if="meta.system" class="metaContainer__system">
			<CommonMarkdown>{{ meta.system }}</CommonMarkdown>
		</div>
		<div v-if="meta.xp" class="metaContainer__xp">
			{{ meta.xp }}
		</div>
		<CommonModal name="metaFullDescription">
			<CommonMarkdown>
				{{ meta.description }}
			</CommonMarkdown>
		</CommonModal>
	</div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
	name: "CharacterMetaContainer",
	computed: {
		...mapState({
			meta ({ characters: { metaDisplay = {} } }) {
				// return (characters.metaDisplay.text || "").replaceAll(/[\n\r]/g, "<br>");
				return {
					description: "xs"
				};
			}
		})
	},
	methods: {
		...mapActions({
			openModal: "openModal"
		}),
		clampText (content = "") {
			let collapsed = "";
			content.split(/\n/).forEach((line, lineIndex) => {
				if (lineIndex < 3) {
					collapsed = `${collapsed}\n`;
					line.split(" ").forEach((word) => {
						if (collapsed.length < 200) {
							collapsed = collapsed.length ? `${collapsed} ${word}` : word;
						}
					});
				}
			}, "");

			return `${collapsed}\n...`;
		}
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
