<template>
	<div class="dotsInput">
		<span class="dotsInput__label">{{ label }}</span>
		<div class="dots">
			<div v-for="i in 5" :key="i" class="dots__dot" />
		</div>
	</div>
</template>
<script>
export default {
	name: "FormDots",
	props: {
		label: {
			type: String,
			default: null
		}
	},
	data: () => ({
		dotCount: 5
	})
}
</script>
<style lang="scss">
.dotsInput {
	display: flex;
	align-items: center;

	.dotsInput__label {
		display: flex;
		width: 100%;
	}

	.dots {
		display: flex;
		width: 100%;
		max-width: 400px;

		&__dot {
			width: 12px;
			height: 12px;
			margin: 0 4px;
			border: 1px solid $grey-dark;

			border-radius: 50%;
		}
	}
}
</style>
