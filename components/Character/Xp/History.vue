<template>
	<div class="xpHistory">
		<div v-for="item in parsedHistory" :key="item.id" class="xpHistory__item">
			<strong>[{{ item.label || item.name }}]: {{ item.value }}</strong> ({{ item.cost }}xp) - <small>{{ item.date | date }}</small>
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
	},
	computed: {
		parsedHistory () {
			return [...(this.data?.history || [])].filter(i => !i.admin).sort((a, b) =>
				a.date.toString() < b.date.toString() ? 1 : -1
			);
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
