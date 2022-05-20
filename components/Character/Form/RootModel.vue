<template>
	<div class="rootModel">
		<div v-if="fieldModified" class="rootModel__reset" @click="resetModel()">
			R
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

	&__reset {
		position: absolute;
		right: 100%;
		margin-right: math.div($gap, 2);

		color: $grey-light;
	}
}
</style>
