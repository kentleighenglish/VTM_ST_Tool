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
			disabled: vm => !!vm.disabled,
			block: vm => !!vm.block,
			state: vm => vm.state,
			inline: vm => !!vm.inline,
			gradient: vm => !!vm.gradient
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
		block: {
			type: Boolean,
			default: false
		},
		inline: {
			type: Boolean,
			default: false
		},
		gradient: {
			type: Boolean,
			default: false
		},
		state: {
			type: String,
			default: null
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

		&--block {
			button {
				width: 100%;
				margin: math.div($gap, 2) 0;
			}
		}

		&--inline {
			button {
				background: none;
				box-shadow: none;
				border-color: transparent;
			}
		}

		@include generateStateModifiers() using ($color) {
			button {
				border-color: $color;
			}

			&.button--gradient {
				button {
					position: relative;
					background-clip: padding-box;
					border: solid 1px transparent;

					@include realShadow(saturate(lighten($color, 15%), 25%));

					&:hover {
						color: darken($color, 20%);
					}

					&:before {
						display: block;
						content: "";
						position: absolute;
						top: 0; right: 0; bottom: 0; left: 0;
						z-index: -1;
						margin: -1px;
						border-radius: inherit;
						@include radiant-gradient($color);
					}
				}
			}
		}
	}
</style>
