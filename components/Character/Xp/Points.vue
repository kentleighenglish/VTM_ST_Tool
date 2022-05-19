<template>
	<div class="xpPoints">
		<div class="xpPoints__available">
			<span>{{ data.availablePoints }}</span> XP
		</div>
	</div>
</template>
<script>
export default {
	name: "CharacterXpPoints",
	props: {
		data: {
			type: Object,
			default: () => ({
				availablePoints: 0
			})
		}
	}
}
</script>
<style lang="scss">
.xpPoints {
	&__available {
		font-size: 2em;
		font-weight: 600;

		span {
			display: inline-block;
			padding: math.div($gap, 2);
			background: $grey-lighter;
			border-radius: 10px;
		}
	}
}
</style>
