<template>
	<div class="characterCreate">
		<div v-if="parsedDefinitionFields" class="characterCreate__definitionFields contentContainer">
			<FormFields
				v-model="characterDefinition"
				:fields="parsedDefinitionFields"
				@input="updateDefinition"
			/>
		</div>
		<div v-if="stage.fields" class="characterCreate__sheet">
			<CharacterSheet
				v-if="currentSkeleton"
				v-model="characterForm"
				:create-mode="true"
				:skeleton="currentSkeleton"
				:xp-disabled="true"
				:xp-check="xpCheck"
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
import * as stages from "@/data/characterCreation";

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
			const { overrideField = f => f } = this.stage;

			const parseFields = fields => Object.keys(fields).reduce((acc, key) => {
				const field = fields[key];

				if (field.fields) {
					field.fields = parseFields(field.fields);
				}

				return {
					...acc,
					[key]: overrideField(field, key, this.characterForm, this.characterDefinition)
				}
			}, {});

			if (this.stageKey && this.stage) {
				return parseFields({
					[this.stageKey]: this.stage.fields
				});
			}

			return null;
		},
		parsedDefinitionFields () {
			if (this.stage && this.stage?.definitionFields) {
				return this.stage.definitionFields(this.characterDefinition);
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
			this.stageEvent("leave");
			if (this.currentStage > 0) {
				this.currentStage--;
				this.stageEvent("enter");
				this.updateStore();
			}
		},
		nextStage () {
			this.stageEvent("leave");
			if (this.currentStage < this.stages.length) {
				this.currentStage++;
				this.stageEvent("enter");
				this.updateStore();
			}
		},
		updateForm () {
			this.updateStore();
		},
		updateDefinition () {
			this.updateForm();

			if (this.stage.definitionChanged) {
				this.characterForm = this.stage.definitionChanged(this.characterForm);
			}
		},
		updateStore () {
			sessionStorage.setItem("createCharacterStore", JSON.stringify({
				form: this.characterForm,
				definition: this.characterDefinition,
				currentStage: this.currentStage
			}));

			if (this.stage.stageComplete) {
				this.stageComplete = this.stage.stageComplete(this.characterForm, this.characterDefinition);
			}
		},
		xpCheck ({ name, cost }) {
			if (this.stage.xpCheck) {
				return this.stage.xpCheck({ name, cost, form: this.characterForm, definition: this.characterDefinition });
			}
			return true;
		},
		stageEvent (type) {
			const { stageEvents = {} } = (this.stage || {});

			if (stageEvents[type]) {
				stageEvents[type](this.characterForm);
			}
		}
	}
}
</script>
