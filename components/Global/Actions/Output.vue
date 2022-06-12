<template>
	<div class="actionsOutput">
		<div v-if="output.length" class="actionsOutput__container">
			<div v-for="(item, index) in output" :key="index" class="actionsOutput__item">
				<div class="actionsOutput__itemName">
					{{ item.name | humanize }}
					<span class="actionsOutput__itemTimestamp">{{ item.timestamp | date('HH:mm:ss') }}</span>
				</div>
				<div v-if="item.type === 'diceRoll'" class="actionsOutput__diceRoll">
					<div v-for="(d, i) in item.result" :key="i" :class="diceResultClassMod(d)">
						{{ d }}
					</div>
				</div>
				<div v-if="item.type === 'custom'" class="actionsOutput__customOutput">
					{{ item.result }}
				</div>
				<div :class="successesClassMod(item.successStatus)">
					{{ item.successOutput }}
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { makeClassMods } from "@/mixins/classModsMixin";
import date from "@/filters/date";
import humanize from "@/filters/humanize";

export default {
	name: "GlobalActionsOutput",
	filters: {
		date,
		humanize
	},
	props: {
		output: {
			type: Array,
			default: () => ([])
		}
	},
	methods: {
		diceResultClassMod (roll) {
			return makeClassMods("actionsOutput__diceRollItem", {
				crit: vm => vm === 10,
				fail: vm => vm === 1
			}, roll);
		},
		successesClassMod (val) {
			return makeClassMods("actionsOutput__successes", {
				crit: vm => vm === "crit",
				fail: vm => vm === "botch"
			}, val);
		}
	}
}
</script>
<style lang="scss">
.actionsOutput {
	width: 500px;
	height: 100%;
	flex-shrink: 0;
	padding: $gap * 2;

	@include realShadow($grey-dark);
	background: $grey-lighter;
	border-radius: $global-border-radius;

	&__item {
		padding: math.div($gap, 2) 0;

		&:not(:last-child) {
			border-bottom: 2px solid $grey;
		}

		&Name {
			font-size: 1.1em;
		}

		&Timestamp {
			font-size: 0.7em;
			color: $grey;
		}
	}

	&__customOutput {
		font-size: 1.2em;
		font-weight: 700;
	}

	&__successes {
		font-weight: 700;

		&--crit {
			color: darken(saturate($success, 30%), 15%);
		}
		&--fail {
			color: $danger;
		}
	}

	&__diceRollItem {
		display: inline-block;
		font-size: 1.2em;
		font-weight: 700;

		&--crit {
			color: darken(saturate($success, 30%), 15%);
		}
		&--fail {
			color: $danger;
		}

		&:not(:last-of-type) {
			&:after {
				display: inline-block;
				content: "+";
				margin: 0 math.div($gap, 2);
				color: $grey-darkest;
			}
		}
	}
}
</style>
