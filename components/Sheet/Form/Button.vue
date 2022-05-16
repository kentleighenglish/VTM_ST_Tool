<template>
	<div :class="componentClass">
		<button :type="type" :disabled="disabled" @click="onClick">
			<slot />
		</button>
	</div>
</template>
<script>
import classModsMixin from "@/mixins/classModsMixin";

export default {
	name: "SheetFormButton",
	mixins: [classModsMixin],
	classMod: {
		baseClass: "formButton",
		modifiers: {
			disabled: vm => !!vm.disabled
			// block: vm => !!vm.block,
			// state: vm => vm.state,
			// inline: vm => !!vm.inline,
			// nomargin: vm => !!vm.nomargin
		}
	},
	props: {
		click: {
			type: Function,
			default: () => {}
		},
		type: {
			type: String,
			default: "button"
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		onClick (e) {
			this.$emit("click", e);

			if (this.click) {
				this.click(e);
			}
		}
	}
}
</script>
<style lang="scss">
	.formButton {
		button {
			border: none;
			background: none;
			padding: math.div($gap, 4) $gap;
			margin: math.div($gap, 2);
			font-family: $font-family-default;
			cursor: pointer;

			background: $grey-lighter;
			color: $grey-darker;

			@include realShadow($grey);
			transition: box-shadow .6s;

			&:disabled {
				opacity: 0.8;
				color: $grey;
				box-shadow: none;
				cursor: default;
			}
		}
	}
</style>
