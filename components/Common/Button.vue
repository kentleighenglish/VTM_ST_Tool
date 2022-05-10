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
	name: "CommonButton",
	mixins: [classModsMixin],
	classMod: {
		baseClass: "button",
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
		},
		blocks: {
			type: Boolean,
			default: false
		},
		inline: {
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
	.button {
		button {
			background: none;
			padding: math.div($gap, 2) $gap;
			margin: math.div($gap, 2);
			font-family: $font-family-default;
			font-size: 0.9em;
			cursor: pointer;

			background: $grey-lighter;
			color: $grey-darker;

			border: $grey-light 1px solid;

			@include realShadow($grey);
			transition: box-shadow .6s;

			&:hover {
				color: $primary;
				background: $grey-lightest;
			}

			&:disabled {
				opacity: 0.8;
				color: $grey;
				box-shadow: none;
				cursor: default;
			}
		}
	}
</style>
