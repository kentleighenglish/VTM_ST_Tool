<template>
	<div class="actionsMods">
		<CommonButton state="primary">Buff Attribute</CommonButton>
		<div class="st-padding-h">
			<span>Blood Pool</span>
			<CommonStatusDots
				:read-only="true"
				:max-dots="40"
				:current-value="bloodPool"
			/>
		</div>
	</div>
</template>
<script>
import { get } from "lodash";
import { mapState } from "vuex";

export default {
	name: "GlobalActionsMods",
	props: {
		characterId: {
			type: String,
			default: null
		}
	},
	computed: {
		...mapState({
			characterSheet ({ characters: { characters } }) {
				const char = characters.find(c => c.id === this.characterId);

				if (char) {
					return (char.sheet || {});
				}
				return {};
			}
		}),
		bloodPool () {
			return get(this.characterSheet, "status.condition.bloodPool", 0);
		}
	}
}
</script>
<style lang="scss">
.actionsMods {
	margin-bottom: $gap;

	.stickyBlock__inner {
		display: flex;
		flex-direction: column;
	}
}
</style>
