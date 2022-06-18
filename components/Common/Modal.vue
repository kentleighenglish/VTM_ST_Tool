<template>
	<portal v-if="visible" to="modal">
		<div class="modal">
			<div class="modal__content" :class="modalClass" :style="modalStyle">
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
			<div v-if="overlay" class="overlay" :style="overlayStyle" @click="overlayClick()" />
		</div>
	</portal>
</template>
<script>
import { mapState, mapActions } from "vuex";
import classModsMixin from "@/mixins/classModsMixin";

export default {
	name: "CommonModal",
	mixins: [classModsMixin],
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
		modalStyle: {
			opacity: 0,
			transform: "translateY(-250%)"
		},
		overlayStyle: {
			opacity: 0
		}
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
				this.animateOut();
				setTimeout(() => this.animateIn(), 100);
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
				this.onClose();
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
			this.animateOut();
			setTimeout(() => {
				this.closeModal();
			}, 200);
		},
		animateOut () {
			this.modalStyle = {
				opacity: 0,
				transform: "translateY(-250%)"
			}
			this.overlayStyle = {
				opacity: 0,
				backdropFilter: "blur(0px) grayscale(0%)"
			}
		},
		animateIn () {
			this.modalStyle = {
				opacity: 1,
				transform: "translateY(0%)"
			}
			this.overlayStyle = {
				opacity: 1,
				backdropFilter: "blur(3px) grayscale(50%)"
			}
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

	&__content {
		position: relative;
		display: flex;
		z-index: 2;
		width: 500px;
		max-width: 100%;
		max-height: 100%;
		flex-direction: column;
		overflow: visible;
		transition: transform 0.2s, opacity 0.2s;

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
		overflow: visible;

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
	z-index: 1;
	transition: opacity 0.2s, backdrop-filter 0.2s;
}

</style>
