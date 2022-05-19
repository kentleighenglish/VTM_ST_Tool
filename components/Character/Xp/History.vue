<template>
	<div class="xpHistory">
		<div v-for="item in data.history" :key="item.id" class="xpHistory__item">
			<strong>[{{ item.name }}]: {{ item.value }}</strong> ({{ item.cost }}xp) - <small>{{ item.date | date }}</small>
		</div>
	</div>
</template>
<script>
import date from "@/filters/date";

export default {
	name: "CharacterXpHistory",
	filters: {
		date
	},
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
.xpHistory {
	margin-top: $gap;

	&__item {
		font-weight: 300;
		color: $grey;
	}
}
</style>
