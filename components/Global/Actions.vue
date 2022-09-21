<template>
	<div class="globalActions">
		<div class="globalActions__filter">
			<FormInput
				v-model.trim="actionFilter"
				name="actionFilter"
				label="Filter"
				@keydown.enter="onFilterTrigger"
				:original-value="null"
				:disable-meta-display="true"
			/>
		</div>
		<div class="globalActions__actionsContainer">
			<div v-for="(actionSection, key) in actions" :key="key" class="globalActions__column">
				<div class="globalActions__columnLabel">
					{{ key | humanize }}
				</div>
				<div class="globalActions__actions">
					<div
						v-for="(action, actionKey) in actionSection"
						:key="actionKey"
						class="globalActions__action"
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
		</div>
		<div class="globalActions__output">
			<CommonSticky :offset-top="80">
				<GlobalActionsMods :character-id="characterId" />
				<GlobalActionsOutput :output="output" />
			</CommonSticky>
		</div>
		<CommonModal
			name="diceRollModal"
			confirm-label="Roll"
			:confirm="onRoll"
			:close="onRollCancel"
			:confirm-disabled="!(rollConfig.stat1 || rollConfig.stat2) || !rollConfig.difficulty"
		>
			<div v-if="rollConfig.action" class="st-flex st-padding-h">
				<h3 class="nomargin">{{rollConfig.action.label}}</h3>
			</div>
			<div class="st-flex">
				<div class="st-flex st-padding-h">
					<FormInput
						v-model="rollConfig.stat1"
						label="Stat 1"
						type="select"
						:options="statsOptions"
						:searchable="true"
						disable-reset
						disable-meta-display
						@input="updateRollCalc"
					/>
				</div>
				<div class="st-flex st-padding-h">
					<FormInput
						v-model="rollConfig.stat2"
						label="Stat 2"
						type="select"
						:options="statsOptions"
						:searchable="true"
						disable-reset
						disable-meta-display
						@input="updateRollCalc"
					/>
				</div>
			</div>
			<div class="st-padding-h">
				<FormInput
					v-model="rollConfig.difficulty"
					label="Difficulty"
					type="number"
					:max="9"
					:min="1"
					disable-reset
					disable-meta-display
					@input="updateRollCalc"
				/>
			</div>
			<div class="st-padding-h">
				<FormInput
					v-model="rollConfig.mods"
					label="Modifiers"
					type="select"
					multiple
					disable-reset
					disable-meta-display
					:options="modsOptions"
					:placeholder="`Select Modifiers (${Object.keys(modsOptions).length} Available)`"
					@input="updateRollCalc"
				/>
			</div>
			<div v-if="rollCalc.pool && rollCalc.difficulty" class="st-padding-h">
				<hr class="st-margin-v">
				<div class="rollSummary">
					<div
						v-for="(d, i) in rollCalc.summary"
						:key="i"
						class="rollSummary__item"
						:class="{
							'rollSummary__item--negative': d.pool < 0 || d.difficulty > 0,
							'rollSummary__item--superNegative': d.pool < -3 || d.difficulty > 3
						}"
					>
						<strong>{{d.label}}: </strong>
						<span v-if="d.difficulty !== undefined">{{ d.difficulty | signed }} Difficulty</span>
						<span v-if="d.pool !== undefined">{{ d.pool | signed }}d</span>
					</div>
				</div>
				<span>Rolling <strong>{{ rollCalc.pool }}d10</strong></span>&nbsp;
				<span>(Difficulty: <strong>{{ rollCalc.difficulty }}</strong>)</span>
			</div>
		</CommonModal>
	</div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { get, reduce, fromPairs, sortBy } from "lodash";
import * as merits from "@/data/status/merits";
import * as flaws from "@/data/status/flaws";
import * as disciplines from "@/data/advantages/disciplines";
import humanize from "@/filters/humanize";
import signed from "@/filters/signed";
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
		humanize,
		signed
	},
	props: {
		characterId: {
			type: String,
			default: null
		}
	},
	data () {
		return {
			output: [],
			actionFilter: null,
			rollConfig: {
				...defaultRollConfig
			},
			rollCalc: {
				pool: 0,
				difficulty: 0
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
		highlighted () {
			return Object.values(this.actions).reduce((acc, actions = []) => ([
				...acc,
				...Object.values(actions).filter(action => action.highlight)
			]), []);
		},
		actions () {
			const filterRegex = new RegExp(this.actionFilter, "i");

			return reduce(actions, (acc, actionGroup, key) => {
				let groupActions = reduce(actionGroup, (acc2, action, actionKey) => {
					let label = action.label || humanize(actionKey);
					let highlight = true;

					if (this.actionFilter) {
						if (filterRegex.test(label)) {
							label = label.replace(filterRegex, m => `**${m}**`);
						} else {
							highlight = false;
						}
					}

					return [
						...acc2,
						[
							actionKey,
							{
								...action,
								group: key,
								name: actionKey,
								label,
								highlight
							}
						]
					];
				}, []);

				groupActions = sortBy(groupActions.reverse(), ["[1].highlight", "-[1].label"]).reverse();

				return { ...acc, [key]: fromPairs(groupActions) };
			}, {});
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
			const { _custom, ...charDisciplines } = get(this.characterSheet, "advantages.disciplines.list", {});

			const mods = reduce(
				{ ...charDisciplines, ...meritsFlawsList },
				(acc, value, key) => {
					const mod = get(Object.assign({}, meritsFlaws, disciplines), key, null);

					if (mod) {
						const { relatedStats = [], rollModifier = () => ({}) } = mod;

						if (
							relatedStats.includes(this.rollConfig.stat1) ||
							relatedStats.includes(this.rollConfig.stat2)
						) {
							const mods = [];
							const { difficulty, pool, success, botch } = rollModifier({
								stats: [this.rollConfig.stat1, this.rollConfig.stat2],
								sheet: this.characterSheet
							});

							if (difficulty) {
								mods.push(`${signed(difficulty)} Difficulty`);
							}
							if (pool) {
								mods.push(`${signed(pool)} Dice Pool`);
							}
							if (success) {
								mods.push(`${signed(success)} Success`);
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
				},
				{}
			);

			return mods;
		}
	},
	methods: {
		...mapActions({
			openModal: "openModal",
			triggerAction: "actions/triggerAction",
			getActionCalc: "actions/getActionCalc"
		}),
		async updateRollCalc () {
			this.rollCalc = {
				pool: 0,
				difficulty: 0
			};

			const { stat1, stat2, mods, difficulty, action: { type }, name, group } = this.rollConfig;

			const characterId = this.characterId;

			if ((!stat1 && !stat2) || !type || !difficulty) {
				return;
			}

			const payload = {
				characterId,
				group,
				name,
				type,
				stat1,
				stat2,
				difficulty,
				mods
			};

			const calc = await this.getActionCalc(payload);

			this.rollCalc = {
				pool: calc.dicePool,
				difficulty: calc.difficulty,
				summary: calc.summary
			};
		},
		onFilterTrigger () {
			if (this.highlighted && this.highlighted.length === 1) {
				const action = this.highlighted[0];
				this.onActionClick(action.name, action.group, action);
			}
		},
		onActionClick (name, group, action) {
			const difficulty = (action.difficulty || defaultRollConfig.difficulty);
			const stat1 = (action.rollStats[0] || null);
			const stat2 = (action.rollStats[1] || null);

			this.rollConfig = { ...this.rollConfig, stat1, stat2, difficulty, action, name, group };

			if (action.type === "custom") {
				return this.onRoll();
			} else {
				this.updateRollCalc();
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

			if (action) {
				this.output.unshift(action);
			}

			this.rollConfig = {
				...defaultRollConfig
			}
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
.globalActions {
	display: grid;
	grid-template-columns: repeat(4, minmax(0, 1fr));
	grid-template-rows: auto minmax(0, 1fr);

	grid-template-areas: "filter filter filter output"
	"actions actions actions output"
	"actions actions actions output";

	height: 100%;
	padding: $gap * 2 $gap;

	&__filter {
		grid-area: filter;
	}

	&__actionsContainer {
		grid-area: actions;
		display: flex;
	}

	&__output {
		grid-area: output;
	}

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

.rollSummary {
	display: grid;
	grid-template-columns: min-content;
	grid-template-rows: auto;
	margin: 0 0 math.div($gap, 2);

	&__item {
		display: inline-block;
		white-space: nowrap;

		margin: math.div($gap, 4) 0;

		&--negative {
			color: $warning;
		}
		&--superNegative {
			color: $danger;
		}
	}
}
</style>
