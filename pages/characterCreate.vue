<template>
	<div class="characterCreate">
		<div v-if="stage.defineFields" class="characterCreate__defineFields contentContainer">
			<FormFields
				v-if="stage.defineFields"
				v-model="characterDefinition"
				:fields="stage.defineFields"
				@input="updateForm"
			/>
		</div>
		<div v-if="stage.fields" class="characterCreate__sheet">
			<CharacterSheet
				v-if="currentSkeleton"
				v-model="characterForm"
				:create-mode="true"
				:skeleton="currentSkeleton"
				:xp-disabled="true"
				@input="updateForm"
			>
				<template #title>
					{{ stage.title || "Create Character" }}
				</template>
				<template #subtitle>
					{{ stage.subtitle }}
				</template>
			</CharacterSheet>
		</div>
		<div class="characterCreate__nav contentContainer">
			<hr>
			<div class="st-flex st-align-end">
				<CommonButton
					v-if="currentStage > 0"
					state="primary"
					:disabled="!stageComplete"
					@click="prevStage"
				>
					Previous Stage
				</CommonButton>
				<CommonButton
					v-if="(currentStage + 1) < stages.length"
					state="primary"
					:disabled="!stageComplete"
					@click="nextStage"
				>
					Next Stage
				</CommonButton>
			</div>
		</div>
	</div>
</template>
<script>
import * as stages from "@/data/characterCreation/stages";

export default {
	name: "CharacterCreatePage",
	data: () => ({
		characterForm: {},
		characterDefinition: {},
		currentStage: 0,
		stageComplete: false
	}),
	head: {
		title: "Create Character"
	},
	computed: {
		stages () {
			return Object.keys(stages);
		},
		stageKey () {
			return this.stages[this.currentStage];
		},
		stage () {
			return (stages[this.stageKey] || {});
		},
		currentSkeleton () {
			if (this.stageKey && this.stage) {
				return {
					[this.stageKey]: this.stage.fields
				};
			}

			return null;
		}
	},
	mounted () {
		const restoredCharacter = JSON.parse(sessionStorage.getItem("createCharacterStore") || "{}");

		if (restoredCharacter.form) {
			this.characterForm = restoredCharacter.form;
		}
		if (restoredCharacter.definition) {
			this.characterDefinition = restoredCharacter.definition;
		}
		if (restoredCharacter.currentStage) {
			this.currentStage = restoredCharacter.currentStage;
		}

		this.updateForm();
	},
	methods: {
		prevStage () {
			if (this.currentStage > 0) {
				this.currentStage--;
				this.updateStore();
			}
		},
		nextStage () {
			if (this.currentStage < this.stages.length) {
				this.currentStage++;
				this.updateStore();
			}
		},
		updateForm () {
			if (this.stage.stageComplete) {
				this.stageComplete = this.stage.stageComplete(this.characterForm, this.characterDefinition);
			}

			this.updateStore();
		},
		updateStore () {
			sessionStorage.setItem("createCharacterStore", JSON.stringify({
				form: this.characterForm,
				definition: this.characterDefinition,
				currentStage: this.currentStage
			}));
		}
	}
}
</script>
