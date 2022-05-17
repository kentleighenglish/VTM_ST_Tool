<template>
	<div ref="stickyContainer" class="stickyBlock" :style="{ height: `${containerHeight}px` }">
		<div class="stickyBlock__inner" :style="stickyStyle">
			<slot />
		</div>
	</div>
</template>
<script>
export default {
	name: "CommonSticky",
	props: {
		offsetTop: {
			type: Number,
			default: 0
		}
	},
	data: () => ({
		scrollPos: 1,
		containerHeight: 0
	}),
	computed: {
		positionState () {
			const scrollPos = this.scrollPos;
			const scrollOffset = this.getScrollOffset();

			if (scrollPos > scrollOffset - this.offsetTop) {
				return "fixed";
			}

			return "initial";
		},
		stickyStyle () {
			return {
				// maxHeight: `${this.maxHeight}px`,
				position: this.positionState,
				transform: `translateY(${this.positionState === "fixed" ? this.offsetTop : 0}px)`,
				top: 0
			}
		}
	},
	mounted () {
		window.addEventListener("resize", () => this.updateHeight());
		window.addEventListener("scroll", () => this.updateScroll());

		this.updateHeight();
		this.updateScroll();
	},
	methods: {
		updateHeight () {
			const el = this.$refs.stickyContainer;

			if (el) {
				const innerEl = el.querySelector(".stickyBlock__inner");
				if (innerEl) {
					this.containerHeight = innerEl.clientHeight;
				}
			}
		},
		updateScroll () {
			this.scrollPos = (window.scrollY || 0);
		},
		getScrollOffset () {
			const el = this.$refs.stickyContainer;
			if (!el) {
				return 0;
			}

			const getOffset = (el) => {
				if (el.offsetTop !== 0) {
					return el.offsetTop;
				}

				return getOffset(el.parentNode);
			}

			return getOffset(el);
		}
	}
}
</script>
<style lang="scss">
.stickyBlock {
	&__inner {
		width: 100%;
	}
}
</style>
