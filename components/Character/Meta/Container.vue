<template>
	<div :class="componentClass">
		<div v-if="isLocked" class="metaContainer__lockedIcon">
			<CommonIcon>lock</CommonIcon>
		</div>
		<div class="metaContainer__inner">
			<div v-if="meta.description" class="metaContainer__shortDescription">
				<CommonMarkdown>{{ meta.shortDescription || meta.description }}</CommonMarkdown>
				<CommonButton v-if="meta.shortDescription" block inline @click="openMetaFullDescriptionModal">
					Read More
				</CommonButton>
			</div>
			<div v-if="meta.system" class="metaContainer__system">
				<CommonMarkdown>{{ meta.shortSystem || meta.system }}</CommonMarkdown>
				<CommonButton v-if="meta.shortSystem" block inline @click="openMetaFullSystemModal">
					Read More
				</CommonButton>
			</div>
			<div v-if="meta.xp" class="metaContainer__xp">
				<div v-if="meta.xp.cost" class="metaContainer__xpCost">
					{{ meta.xp.cost }}xp
				</div>
			</div>
		</div>
		<CommonModal
			name="metaFullDescription"
			:confirm-hidden="true"
		>
			<CommonMarkdown style="max-width:700px">
				{{ meta.description }}
			</CommonMarkdown>
		</CommonModal>
		<CommonModal
			name="metaFullSystem"
			:confirm-hidden="true"
		>
			<CommonMarkdown style="max-width:700px">
				{{ meta.system }}
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
						: null,
					system: system || "",
					shortSystem: (system || "").length > 200
						? this.clampText(system || "")
						: null,
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
		openMetaFullSystemModal () {
			this.openModal({ modal: "metaFullSystem" });
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
	padding: 0 $gap;

	&__inner {
		grid-auto-columns: minmax(0, 1fr);
		grid-auto-rows: repeat(3, 1fr);
		display: grid;
		grid-gap: $gap;
		padding: math.div($gap, 2) $gap;
	}

	&__lockedIcon {
		position: absolute;
		display: flex;
		width: 100%;
		justify-content: flex-end;
		padding: math.div($gap, 2) $gap;

		color: lighten($primary, 15%);
		text-shadow: 3px 3px 6px fade-out($grey, 0.7);

		opacity: 0;
		transition: opacity 0.2s;

		.metaContainer--locked & {
			opacity: 1;
		}
	}

	&__shortDescription, &__system {
		border-radius: $global-border-radius;
		border: 1px solid transparent;
		background: $grey-lighter;
		padding: $gap;
		transition: box-shadow 0.3s, border-color 0.1s;

		@include realShadow($grey-darkest);

		.metaContainer--locked & {
			border-color: $primary;

			@include realShadow($grey-light, false, 0.5);
		}
	}

	&__shortDescription {
		display: flex;
		flex-direction: column;
		height: 200px;

		.markdown {
			display: block;
			height: 100%;
			overflow: hidden;
		}
	}

	&__system {

	}

	&__xp {

		&Cost {
			font-size: 2em;
			font-weight: 800;
		}
	}
}
</style>
