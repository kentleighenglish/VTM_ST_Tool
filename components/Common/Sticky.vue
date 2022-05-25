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
		},
		overflowScroll: {
			type: Boolean,
			default: false
		},
		zIndex: {
			type: Number,
			default: null
		}
	},
	data: () => ({
		scrollPos: 1,
		containerHeight: 0,
		containerWidth: 0,
		windowHeight: 0
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
				top: 0,
				width: "100%",
				maxWidth: `${this.containerWidth}px`,
				maxHeight: `${this.windowHeight - this.offsetTop - 40}px`,
				zIndex: (this.zIndex || null),
				overflowY: this.overflowScroll ? "auto" : "initial",
				overflowX: "clip"
			}
		}
	},
	mounted () {
		this.stickyResizeListener = window.addEventListener("resize", () => this.updateSize());
		this.stickyScrollListener = window.addEventListener("scroll", () => this.updateScroll());

		this.updateSize();
		this.updateScroll();
	},
	methods: {
		updateSize () {
			const el = this.$refs.stickyContainer;

			if (el) {
				const innerEl = el.querySelector(".stickyBlock__inner");
				if (innerEl) {
					this.containerHeight = innerEl.clientHeight;
				}

				this.containerWidth = el.clientWidth;
			}

			this.windowHeight = window.innerHeight;
		},
		updateScroll () {
			this.updateSize();

			this.scrollPos = (window.scrollY || 0);
		},
		getScrollOffset () {
			const el = this.$refs.stickyContainer;
			if (!el) {
				return 0;
			}

			const getOffset = (el) => {
				if (el.offsetTop !== 0) {
					return el.offsetTop || 0;
				}

				return getOffset(el.parentNode) || 0;
			}

			return getOffset(el);
		}
	}
}
</script>
