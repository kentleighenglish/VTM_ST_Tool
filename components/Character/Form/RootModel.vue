<template>
	<div
		class="rootModel"
		@mouseout="onMouseLeave($event)"
		@mouseover="onHover($event)"
		@click.middle.stop.prevent="onMetaLock($event)"
	>
		<div v-if="fieldModified" class="rootModel__reset" @click="resetModel()">
			<CommonIcon>refresh</CommonIcon>
		</div>
		<div class="rootModel__input">
			<slot />
		</div>
	</div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
	name: "CharacterFormRootModel",
	computed: {
		...mapState({
			metaDisplayLocked ({ metaDisplayLocked }) {
				return metaDisplayLocked;
			},
			metaDisplay ({ metaDisplay }) {
				return metaDisplay;
			}
		}),
		childComponent () {
			return this.$slots?.default[0]?.context || {};
		},
		fieldModified () {
			return this.childComponent.model !== this.childComponent.originalValue;
		}
	},
	updated () {
		this.updateMeta();
	},
	methods: {
		...mapActions({
			updateMetaDisplay: "updateMetaDisplay",
			setMetaDisplayLock: "setMetaDisplayLock"
		}),
		resetModel () {
			if (this.childComponent.resetValue) {
				this.childComponent.resetValue();
			} else {
				this.childComponent.updateValue(this.childComponent.originalValue);
			}
		},
		updateMeta () {
			if (!this.metaDisplayLocked) {
				const { name, meta = {}, value, hoverDot = null } = this.childComponent;

				let metaDisplay = {
					description: (meta.description || ""),
					system: "",
					xp: {}
				}

				if (meta.getMetaDisplay) {
					metaDisplay = meta.getMetaDisplay({ name, meta, value, hoverDot });
				}

				this.updateMetaDisplay({ name, ...metaDisplay });
			}
		},
		onHover ($event) {
			this.updateMeta();
		},
		onMouseLeave ($event) {
			if (!this.metaDisplayLocked) {
				this.updateMetaDisplay({});
			}
		},
		onMetaLock ($event) {
			if (!this.metaDisplayLocked) {
				this.setMetaDisplayLock(true);
			} else {
				this.setMetaDisplayLock(false);
			}
		}
	}
}
</script>
<style lang="scss">
.rootModel {
	position: relative;
	width: 100%;

	&__reset {
		position: absolute;
		z-index: 50;

		right: 100%;
		margin-right: math.div($gap, 4);
		margin-top: -1px;
		padding: math.div($gap, 4);

		color: $grey-light;

		&:hover {
			color: $primary;
			cursor: pointer;
		}

		span {
			font-size: 1em;
		}
	}
}
</style>
