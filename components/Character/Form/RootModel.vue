<template>
	<div class="rootModel">
		<div v-if="fieldModified" class="rootModel__reset" @click="resetModel()">
			<CommonIcon>refresh</CommonIcon>
		</div>
		<div class="rootModel__input">
			<slot />
		</div>
	</div>
</template>
<script>
export default {
	name: "CharacterFormRootModel",
	computed: {
		childComponent () {
			return this.$slots?.default[0]?.context || {};
		},
		fieldModified () {
			return this.childComponent.model !== this.childComponent.originalValue;
		}
	},
	methods: {
		resetModel () {
			if (this.childComponent.resetValue) {
				this.childComponent.resetValue();
			} else {
				this.childComponent.updateValue(this.childComponent.originalValue);
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
