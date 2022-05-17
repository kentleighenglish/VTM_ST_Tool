<template>
	<div ref="stickyContainer" class="stickyBlock" :style="stickyStyle">
		<slot />
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
		maxHeight: 0,
		scrollPos: 1
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
			const docHeight = document.body.clientHeight;
			const el = this.$refs.stickyContainer;

			if (el) {
				this.maxHeight = docHeight - el.offsetTop - 40;
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
