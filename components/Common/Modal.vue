<template>
	<portal v-if="visible" to="modal">
		<div :class="componentClass">
			<div class="modal__content" :class="modalClass">
				<div class="modal__contentInner">
					<slot />
				</div>
				<div class="modal__footer">
					<div v-if="!confirmHidden" class="le-flex le-padding-h">
						<CommonButton
							:state="confirmState"
							block
							:disabled="submitting || confirmDisabled"
							:loading="submitting"
							@click="onConfirm()"
						>
							{{ confirmLabel }}
						</CommonButton>
					</div>
					<div v-if="!closeHidden" class="le-flex le-padding-h">
						<CommonButton inline block :state="closeState" :disabled="submitting || closeDisabled" @click="onClose()">
							{{ closeLabel }}
						</CommonButton>
					</div>
				</div>
			</div>
			<div v-if="overlay" class="overlay" @click="overlayClick()" />
		</div>
	</portal>
</template>
<script>
import { mapState, mapActions } from "vuex";
import classModsMixin from "@/mixins/classModsMixin";

export default {
	name: "CommonModal",
	mixins: [classModsMixin],
	classMod: {
		baseClass: "modal",
		modifiers: {
			entering: vm => vm.entering,
			leaving: vm => vm.leaving,
			loaded: vm => vm.loaded
		}
	},
	props: {
		name: {
			type: String,
			default: "default"
		},
		overlay: {
			type: Boolean,
			default: true
		},
		closeWithOverlay: {
			type: Boolean,
			default: true
		},
		confirm: {
			type: Function,
			default: () => {}
		},
		close: {
			type: Function,
			default: () => {}
		},
		confirmDisabled: {
			type: Boolean,
			default: false
		},
		confirmHidden: {
			type: Boolean,
			default: false
		},
		confirmState: {
			type: String,
			default: "primary"
		},
		closeDisabled: {
			type: Boolean,
			default: false
		},
		closeHidden: {
			type: Boolean,
			default: false
		},
		closeState: {
			type: String,
			default: null
		},
		confirmLabel: {
			type: String,
			default: "Ok"
		},
		closeLabel: {
			type: String,
			default: "Close"
		},
		errorGroup: {
			type: String,
			default: null
		},
		modalClass: {
			type: [String, Object],
			default: ""
		}
	},
	data: () => ({
		submitting: false,
		entering: false,
		leaving: false,
		loaded: false
	}),
	computed: {
		...mapState({
			visible (state) {
				return state.visibleModal === this.name;
			},
			modalData (state) {
				return state.modalData;
			}
		})
	},
	watch: {
		visible (isVisible) {
			if (isVisible) {
				setTimeout(() => {
					this.entering = true;
				}, 100);
				setTimeout(() => {
					this.entering = false;
					this.loaded = true;
				}, 1000);
			} else {
				this.entering = false;
				this.loaded = false;
				this.leaving = false;
			}
		}
	},
	methods: {
		...mapActions({
			closeModal: "closeModal",
			pushToastMessage: "toast/pushMessage"
		}),
		overlayClick () {
			if (this.closeWithOverlay) {
				this.onCloseModal();
			}
		},
		async onConfirm () {
			this.submitting = true;
			try {
				const result = await this.confirm(this);

				this.submitting = false;

				if (result !== false) {
					this.onCloseModal();
				}
			} catch (e) {
				this.pushToastMessage({
					type: "error",
					body: e.getMessage
				});
				this.submitting = false;
				this.error = e;
			}
		},
		async onClose () {
			await this.close(this);

			this.onCloseModal();
		},
		onCloseModal () {
			this.entering = false;
			this.leaving = true;

			setTimeout(() => {
				this.entering = false;
				this.loaded = false;
				this.leaving = false;

				this.closeModal();
			}, 200);
		}
	}
}
</script>
<style lang="scss">

.modal {
	position: absolute;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: ($gap * 2) 0;

	&--entering {
		.modal__content {
			transform: translateY(0%);
		}
	}

	&--loaded {
		.modal__content {
			transform: translateY(0%);
		}
	}

	&--leaving {
		.modal__content {
			transform: translateY(-300%);
		}
	}

	&__content {
		position: relative;
		display: flex;
		z-index: 2;
		width: 500px;
		max-width: 100%;
		max-height: 100%;
		flex-direction: column;
		overflow: auto;
		transition: transform 0.2s;
		transform: translateY(-300%);

		background: $grey-lightest;
		border-radius: $global-border-radius;

		@include realShadow();

		@include mq($from: "sm") {
			min-width: 500px;
			width: initial;
			max-width: initial;
		}
	}

	&__contentInner {
		width: 100%;
		height: 100%;
		padding: $gap;
		overflow: auto;

		h2 {
			margin: 0;
		}
	}

	&__footer {
		display: flex;
		justify-content: flex-end;
		padding: math.div($gap, 2) $gap;
	}
}

.overlay {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: fade-out(black, .6);
	backdrop-filter: blur(3px) grayscale(50%);
	z-index: 1;
}

</style>
