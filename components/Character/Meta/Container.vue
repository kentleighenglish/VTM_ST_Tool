<template>
	<div :class="componentClass">
		<div class="metaContainer__inner">
			<div v-if="meta.description" class="metaContainer__shortDescription">
				<CommonMarkdown>{{ meta.shortDescription }}</CommonMarkdown>
				<CommonButton block inline @click="openMetaFullDescriptionModal">Read More</CommonButton>
			</div>
			<div v-if="meta.system" class="metaContainer__system">
				<CommonMarkdown>{{ meta.system }}</CommonMarkdown>
			</div>
			<div v-if="meta.xp" class="metaContainer__xp">
				{{ meta.xp }}
			</div>
		</div>
		<CommonModal name="metaFullDescription" :confirm-hidden="true">
			<CommonMarkdown>
				{{ meta.description }}
			</CommonMarkdown>
		</CommonModal>
	</div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import classModsMixin from "@/mixins/classModsMixin";

export default {
	name: "CharacterMetaContainer",
	mixins: [classModsMixin],
	classMod: {
		baseClass: "metaContainer",
		modifiers: {
			locked: vm => vm.isLocked
		}
	},
	computed: {
		...mapState({
			isLocked ({ metaDisplayLocked }) {
				return metaDisplayLocked;
			},
			meta ({ metaDisplay = {} }) {
				const { description = "", system = "", xp = {} } = metaDisplay;
				return {
					description: description || "",
					shortDescription: (description || "").length > 200
						? this.clampText(description || "")
						: description || "",
					system: system || "",
					xp: xp || {}
				};
			}
		})
	},
	methods: {
		...mapActions({
			openModal: "openModal"
		}),
		openMetaFullDescriptionModal () {
			this.openModal({ modal: "metaFullDescription" });
		},
		clampText (content = "") {
			let collapsed = "";
			(content || "").split(/\n/).forEach((line, lineIndex) => {
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
	height: 100%;
	max-height: 100%;
	overflow: hidden;
	padding: $gap;

	&__inner {
		grid-auto-columns: minmax(0, 1fr);
		grid-auto-rows: repeat(3, 1fr);
		display: grid;
		padding: $gap;
	}

	&__shortDescription, &__system {
		border-radius: $global-border-radius;
		border: 1px solid transparent;
		background: $grey-lighter;
		padding: $gap;
		transition: box-shadow 0.3s, border-color 0.1s;

		@include realShadow();

		.metaContainer--locked & {
			border-color: $grey-dark;
		}
	}

	&__shortDescription {
		display: flex;
		flex-direction: column;
		height: 200px;

		.markdown {
			display: block;
			overflow: hidden;
		}
	}

	&__system {

	}

	&__xp {

	}
}
</style>
