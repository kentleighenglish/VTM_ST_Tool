<template>
	<div :class="componentClass">
		<div class="toastMessage__timeoutSlider" :style="{ width: `${timerPercentage}%` }" />
		<div class="toastMessage__body">
			{{ body }}
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
			type: vm => vm.type
		}
	},
	props: {
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
			default: 3000
		}
	},
	data () {
		return {
			timerTotal: 0,
			timer: 0,
			timerRunning: true
		}
	},
	computed: {
		timerPercentage () {
			return Math.ceil((this.timer / this.timerTotal) * 100);
		}
	},
	mounted () {
		const wps = 0.00333;
		const match = this.body.match(/[\S]+/g);
		let wpsTimeout = 3000;

		if (match && match.length) {
			wpsTimeout = match.length / wps;
		}

		const timer = this.timeout || wpsTimeout;

		this.timer = timer;
		this.timerTotal = timer;

		if (this.timer > 0) {
			this.timerInterval = setInterval(() => this.updateTimer(), 100);
		}
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
		}
	}
}
</script>
<style lang="scss">
.toastMessage {
	position: relative;
	background: $grey-lightest;
	padding: $gap;
	width: 100%;

	border-left: 5px solid $grey-light;

	@include realShadow($grey-light);

	@include generateStateModifiers() using ($color) {
		@include realShadow($color);

		border-left-color: lighten(desaturate($color, 15%), 10%);

		.toastMessage__timeoutSlider {
			background: darken($color, 10%);
		}
	}

	&__timeoutSlider {
		position: absolute;
		top: 0;
		left: 0;

		height: 3px;
		background: black;
		transition: width 0.1s;
	}
}
</style>
