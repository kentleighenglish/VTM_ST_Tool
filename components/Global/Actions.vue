<template>
	<div class="characterActions">
		<div class="characterActions__filter">
			<FormInput
				v-model.trim="actionFilter"
				name="actionFilter"
				label="Filter"
				:original-value="null"
			/>
		</div>
		<div class="st-flex">
			<div v-for="(actionSection, key) in actions" :key="key" class="characterActions__column">
				<div class="characterActions__columnLabel">
					{{ key | humanize }}
				</div>
				<div class="characterActions__actions">
					<div
						v-for="(action, actionKey) in actionSection"
						:key="actionKey"
						class="characterActions__action"
					>
						<CommonButton
							:disabled="!action.highlight"
							:state="action.type === 'custom' ? 'special' : 'primary'"
							gradient
							@click="onActionClick(actionKey, key, action)"
						>
							{{ action.label }}
						</CommonButton>
					</div>
				</div>
			</div>
			<CharacterActionsOutput :output="output" />
		</div>
		<CommonModal
			name="diceRollModal"
			confirm-label="Roll"
			:confirm="onRoll"
			:close="onRollCancel"
			:confirm-disabled="!rollConfig.stat1 || !rollConfig.stat2 || !rollConfig.difficulty"
		>
			<div class="st-flex">
				<div class="st-flex st-padding-h">
					<FormInput v-model="rollConfig.stat1" label="Stat 1" type="select" :options="statsOptions" disable-reset />
				</div>
				<div class="st-flex st-padding-h">
					<FormInput v-model="rollConfig.stat2" label="Stat 2" type="select" :options="statsOptions" disable-reset />
				</div>
			</div>
			<div class="st-padding">
				<FormInput
					v-model="rollConfig.difficulty"
					label="Difficulty"
					type="number"
					:max="9"
					:min="1"
					disable-reset
				/>
			</div>
			<div class="st-padding">
				<FormInput
					v-model="rollConfig.mods"
					label="Modifiers"
					type="select"
					multiple
					disable-reset
					:options="modsOptions"
				/>
			</div>
		</CommonModal>
	</div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { get, reduce } from "lodash";
import * as merits from "@/data/status/merits";
import * as flaws from "@/data/status/flaws";
import humanize from "@/filters/humanize";
import actions from "@/data/actions";
import { getStats } from "@/utils/parsers";

const meritsFlaws = {
	...merits,
	...flaws
};

const defaultRollConfig = {
	group: null,
	name: null,
	action: {},
	stat1: null,
	stat2: null,
	difficulty: 6,
	mods: []
};

export default {
	name: "GlobalActions",
	filters: {
		humanize
	},
	props: {
		characterId: String
	},
	data () {
		return {
			output: [],
			actionFilter: null,
			rollConfig: {
				...defaultRollConfig
			}
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
		actions () {
			const filterRegex = new RegExp(this.actionFilter, "i");

			return reduce(actions, (acc, actionGroup, key) => ({
				...acc,
				[key]: reduce(actionGroup, (acc2, action, actionKey) => {
					let label = humanize(actionKey);
					let highlight = true;

					if (this.actionFilter) {
						if (filterRegex.test(label)) {
							label = label.replace(filterRegex, m => `**${m}**`);
						} else {
							highlight = false;
						}
					}

					return {
						...acc2,
						[actionKey]: {
							...action,
							label,
							highlight
						}
					};
				}, {})
			}), {});
		},
		stats () {
			return getStats(this.characterSheet);
		},
		statsOptions () {
			return Object.keys(this.stats).reduce((acc, key) => ({
				...acc,
				[key]: humanize(key)
			}), {});
		},
		modsOptions () {
			const meritsFlawsList = get(this.characterSheet, "status.meritsFlaws.list._custom", {});

			const meritsFlawsOptions = Object.keys(meritsFlawsList).reduce((acc, key) => {
				const meritFlaw = meritsFlaws[key];

				if (meritFlaw) {
					const { relatedStats, rollModifier } = meritFlaw;

					if (
						relatedStats.includes(this.rollConfig.stat1) ||
						relatedStats.includes(this.rollConfig.stat2)
					) {
						const mods = [];
						const { difficulty, pool, success, botch } = rollModifier;

						const addPlus = num => num > 0 ? `+${num}` : num;

						if (difficulty) {
							mods.push(`${addPlus(difficulty)} Difficulty`);
						}
						if (pool) {
							mods.push(`${addPlus(pool)} Dice Pool`);
						}
						if (success) {
							mods.push(`${addPlus(success)} Success`);
						}
						if (botch) {
							mods.push(`Remove ${botch} Botch`);
						}

						const name = humanize(key);
						const modsOutput = mods.length ? `(${mods.join(", ")})` : "";
						acc[key] = `${name} ${modsOutput}`.trim();
					}
				}

				return acc;
			}, {});

			return meritsFlawsOptions;
		}
	},
	methods: {
		...mapActions({
			openModal: "openModal",
			triggerAction: "actions/triggerAction"
		}),
		onActionClick (name, group, action) {
			const difficulty = (action.difficulty || defaultRollConfig.difficulty);
			const stat1 = (action.rollStats[0] || null);
			const stat2 = (action.rollStats[1] || null);

			this.rollConfig = { ...this.rollConfig, stat1, stat2, difficulty, action, name, group };

			if (action.type === "custom") {
				return this.onRoll();
			} else {
				return this.openModal("diceRollModal");
			}
		},
		async onRoll () {
			const { stat1, stat2, mods, difficulty, action: { type }, name, group } = this.rollConfig;

			const characterId = this.characterId;

			const actionPayload = {
				characterId,
				group,
				name,
				type,
				stat1,
				stat2,
				difficulty,
				mods
			};

			const action = await this.triggerAction({ ...actionPayload });

			this.output.unshift(action);
		},
		onRollCancel () {
			this.rollConfig = {
				...defaultRollConfig
			}
		}
	}
}
</script>
<style lang="scss">
.characterActions {
	display: flex;
	flex-direction: column;
	height: 100%;
	padding: $gap * 2 $gap;

	&__column {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	&__columnLabel {
		font-size: 1.2em;
		font-weight: 700;
	}

	&__actions {
		display: flex;
		flex-wrap: wrap;
	}

	&__action {
		display: inline-block;
	}
}
</style>
