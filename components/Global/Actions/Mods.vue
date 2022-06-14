<template>
	<div class="actionsMods">
		<CommonButton state="primary" @click="openBuffModal">
			Buff Attribute
		</CommonButton>
		<div class="st-padding-h">
			<span>Blood Pool</span>
			<CommonStatusDots
				:read-only="true"
				:max-dots="40"
				:current-value="bloodPool"
			/>
			{{ activeBuffs }}
		</div>
		<CommonModal
			name="buffAttributeModal"
			confirm-label="Buff"
			:confirm="onBuffAttribute"
			:confirm-disabled="!buffForm.attribute || !buffForm.buffLevel"
			:close="resetBuffForm"
		>
			<FormInput
				v-model="buffForm.attribute"
				type="select"
				:options="attributes"
				:disable-meta-display="true"
				@change="resetBuffLevel"
			/>
			<FormInput
				v-model="buffForm.buffLevel"
				type="number"
				:max="buffMax"
				:min="0"
				:disabled="!buffForm.attribute"
				:disable-meta-display="true"
			/>
			<hr />
			<CommonDots
				v-if="buffAttributeField"
				read-only
				:buff="Number(buffForm.buffLevel)"
				v-bind="buffAttributeField"
			/>
			<CommonStatusDots
				:read-only="true"
				:max-dots="40"
				:current-value="bloodPool"
				:debuff="Number(buffForm.buffLevel)"
			/>
		</CommonModal>
	</div>
</template>
<script>
import { get } from "lodash";
import { mapState, mapActions } from "vuex";
import humanize from "@/filters/humanize";
import * as physicalAttributes from "@/data/attributes/physical";

export default {
	name: "GlobalActionsMods",
	props: {
		characterId: {
			type: String,
			default: null
		}
	},
	data: () => ({
		buffForm: {
			attribute: null,
			buffLevel: null
		}
	}),
	computed: {
		...mapState({
			characterSheet ({ characters: { characters } }) {
				const char = characters.find(c => c.id === this.characterId);
				console.log(char);

				if (char) {
					return (char.sheet || {});
				}
				return {};
			},
			activeBuffs ({ session: { session } }) {
				return (session.activeMods || {})[this.characterId];
			}
		}),
		attributes () {
			const { attributes: { physical = {} } = {} } = this.characterSheet || {};

			return Object.keys(physical).reduce((acc, key) => ({ ...acc, [key]: humanize(key) }), {});
		},
		buffAttributeField () {
			if (this.buffForm.attribute) {
				const { attribute } = this.buffForm;

				const field = physicalAttributes[attribute];
				const value = this.characterSheet.attributes.physical[attribute];

				const maxDots = field.meta.params.maxDots(this.characterSheet);

				return {
					maxDots,
					maxAllowed: maxDots,
					currentValue: value
				}
			}

			return {};
		},
		buffMax () {
			const buffField = this.buffAttributeField;
			const bloodPool = this.bloodPool;

			return Math.min(bloodPool, buffField.maxDots - buffField.currentValue);
		},
		bloodPool () {
			return get(this.characterSheet, "status.condition.bloodPool", 0);
		}
	},
	methods: {
		...mapActions({
			openModal: "openModal",
			buffAttribute: "session/buffAttribute",
			updateCharacter: "characters/update"
		}),
		resetBuffLevel () {
			this.buffForm.buffLevel = null;
		},
		resetBuffForm () {
			this.buffForm.attribute = null;
			this.buffForm.buffLevel = null;
		},
		openBuffModal () {
			this.openModal("buffAttributeModal")
		},
		async onBuffAttribute () {
			const { attribute, buffLevel } = this.buffForm;
			if (attribute && buffLevel) {
				const id = this.characterId;

				await this.buffAttribute({ id, attribute, buffLevel });
				const updatedSheet = {
					status: {
						condition: {
							bloodPool: this.bloodPool - buffLevel
						}
					}
				}
				await this.updateCharacter({ id, sheet: updatedSheet });
			}
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
