<template>
	<portal v-if="visible" to="modal">
		<transition appear name="modal-load" @leave="onLeave">
			<div class="modal">
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
		</transition>
	</portal>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
	name: "CommonModal",
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
		submitting: false
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
	beforeDestroy () {
		this.closeModal();
	},
	methods: {
		...mapActions({
			closeModal: "closeModal"
		}),
		overlayClick () {
			if (this.closeWithOverlay) {
				this.closeModal();
			}
		},
		async onConfirm () {
			this.submitting = true;
			try {
				const result = await this.confirm(this);

				this.submitting = false;

				if (result !== false) {
					this.closeModal();
				}
			} catch (e) {
				console.error(e);
				this.submitting = false;
				this.error = e;
			}
		},
		async onClose () {
			await this.close(this);

			this.closeModal();
		},
		onLeave (el, done) {
			setTimeout(() => {
				done();
			}, 800);
		}
	}
}
</script>
<style lang="scss">

.modal-load-enter-active, .modal-load-leave-active {
	.modal__content {
		overflow: hidden;
		transition: 2s ease;
	}
}
.modal-load-enter, .modal-load-leave-to {
	.modal__content {
		// transform: scaleX(0) scaleY(.5);
		transform: translateY(-100%);
		opacity: 0;
	}
}
.modal-load-enter-to, .modal-load-leave {
	.modal__content {
		transform: translateY(0%);
		opacity: 1;
	}
}

.modal {
	position: absolute;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: ($gap * 2) 0;

	&__content {
		position: relative;
		display: flex;
		z-index: 2;
		width: 500px;
		max-width: 100%;
		max-height: 100%;
		flex-direction: column;

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
