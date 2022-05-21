<template>
	<div :class="componentClass" @mouseover="pauseTimer" @mouseleave="playTimer">
		<div class="toastMessage__inner">
			<div class="toastMessage__timeoutSlider" :style="{ width: `${timerPercentage}%` }" />
			<div class="toastMessage__body">
				{{ body }}
			</div>
		</div>
	</div>
</template>
<script>
import classModsMixin from "@/mixins/classModsMixin";

export default {
	name: "GlobalToastMessage",
	mixins: [classModsMixin],
	classMod: {
		baseClass: "toastMessage",
		modifiers: {
			type: vm => vm.type,
			status: vm => vm.status
		}
	},
	props: {
		id: {
			type: String,
			default: null
		},
		type: {
			type: String,
			default: "default"
		},
		body: {
			type: String,
			default: ""
		},
		timeout: {
			type: Number,
			default: 0
		}
	},
	data () {
		return {
			timerTotal: 0,
			timer: 0,
			timerRunning: false,
			status: "loading"
		}
	},
	computed: {
		timerPercentage () {
			return Math.ceil((this.timer / this.timerTotal) * 100);
		}
	},
	mounted () {
		const wps = 0.00333;
		const match = (this.body || "").match(/[\S]+/g);
		let wpsTimeout = 3000;

		if (match && match.length) {
			wpsTimeout = match.length / wps;
		}

		const timer = Math.max(this.timeout || wpsTimeout, 5000);

		this.timer = timer;
		this.timerTotal = timer;

		if (this.timer > 0) {
			this.timerInterval = setInterval(() => this.updateTimer(), 100);
		}

		setTimeout(() => {
			this.status = "loaded"
			this.timerRunning = true;
		}, 50);
	},
	beforeDestroy () {
		if (this.timerInterval) {
			clearInterval(this.timerInterval);
		}
	},
	methods: {
		pauseTimer () {
			this.timerRunning = false;
		},
		playTimer () {
			this.timerRunning = true;
		},
		updateTimer () {
			if (this.timerRunning && this.timer > 0) {
				this.timer += -100;
			}

			if (this.timer <= 0) {
				this.status = "destroying";

				setTimeout(() => this.$emit("dismiss", this.id), 500);
			}
		}
	}
}
</script>
<style lang="scss">
.toastMessage {
	position: relative;
	width: 100%;

	transform: translateX(150%);
	transition: transform 0.5s, max-height 2s;
	max-height: 0px;
	overflow: hidden;
	pointer-events: all;

	&__inner {
		width: 100%;
		border-left: 5px solid $grey-light;
		background: lighten($grey-lightest, 2%);
		padding: $gap;
		margin-bottom: $gap;

		@include realShadow($grey-light);
	}

	&--loaded {
		transform: translateX(0%);
		max-height: 600px;
	}

	@include generateStateModifiers() using ($color) {
		.toastMessage__inner {
			@include realShadow($color);

			border-left-color: $color;
		}

		.toastMessage__body {
			color: darken($color, 15%);
		}
	}

	&__timeoutSlider {
		position: absolute;
		top: 0;
		left: 0;

		height: 3px;
		background: $grey-light;
		transition: width 0.1s;
	}
}
</style>
