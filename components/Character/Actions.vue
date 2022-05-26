<template>
	<div class="characterActions">
		{{ data }}
		{{ getHealthMod() }}
	</div>
</template>
<script>
import { decodeHealthValue } from "@/utils/parsers";
import { healthLevels } from "@/data/status";

export default {
	name: "SheetActions",
	props: {
		data: {
			type: Object,
			default: () => ({})
		}
	},
	methods: {
		getHealthMod () {
			const healthArray = decodeHealthValue(this.data?.status?.other?.health);

			const healthStatus = healthLevels[healthArray.length - 1];
			console.log(this.data?.status?.other?.health, healthArray, healthStatus);

			return healthStatus?.dicePoolMod || 0;
		}
	}
}
</script>
<style lang="scss">
.characterActions {
	padding: $gap * 2 $gap;
}
</style>
