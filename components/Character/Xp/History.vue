<template>
	<div class="xpHistory">
		<div v-for="item in data.history" :key="item.id" class="xpHistory__item">
			some text
		</div>
	</div>
</template>
<script>
export default {
	name: "CharacterXpHistory",
	props: {
		data: {
			type: Object,
			default: () => ({
				history: []
			})
		}
	}
}
</script>
<style lang="scss">
.xpPoints {
	&__item {
		font-weight: 300;
		color: $grey-light;
	}
}
</style>
