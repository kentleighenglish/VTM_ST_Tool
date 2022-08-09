<template>
	<div class="characterCreate">
		<div v-if="parsedDefinitionFields" class="characterCreate__definitionFields contentContainer">
			<h1>
				{{ stage.title || "Create Character" }} ({{ stageProgress }})
			</h1>
			<FormFields
				v-model="characterDefinition"
				:fields="parsedDefinitionFields"
				@input="updateDefinition"
			/>
		</div>
		<div v-if="stage.fields" class="characterCreate__sheet">
			<CharacterSheet
				v-if="currentSkeleton"
				:value="formValue"
				:original-value="originalFormValue"
				:create-mode="true"
				:skeleton="currentSkeleton"
				:xp-disabled="true"
				:xp-check="xpCheck"
				@input="updateForm"
			>
				<template #title>
					{{ stage.title || "Create Character" }} ({{ stageProgress }})
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
		<div class="contentContainer">
			<div class="st-flex st-align-end">
				<CommonButton state="special" @click="onCharacterSubmit">
					Create Character
				</CommonButton>
			</div>
		</div>
	</div>
</template>
<script>
import { mapActions } from "vuex";
import { merge } from "lodash";
import * as stages from "@/data/characterCreation";

export default {
	name: "CharacterCreatePage",
	data: () => ({
		characterForm: {},
		freebiesForm: {},
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
		formValue () {
			return this.stage.freebiesMode
				? merge(this.characterForm, this.freebiesForm)
				: { ...this.characterForm };
		},
		originalFormValue () {
			return this.stage.freebiesMode ? this.characterForm : {};
		},
		currentSkeleton () {
			const { overrideField = f => f } = this.stage;

			const parseFields = (fields, path = []) => Object.keys(fields).reduce((acc, key) => {
				const field = fields[key];
				const newPath = [...path];

				if (field.fields) {
					field.fields = parseFields(field.fields, [...newPath, key]);
				}

				return {
					...acc,
					[key]: overrideField({
						field,
						name: key,
						form: this.characterForm,
						definition: this.characterDefinition,
						path: newPath
					})
				}
			}, {});

			if (this.stageKey && this.stage) {
				return parseFields({
					...this.stage.fields
				});
			}

			return null;
		},
		parsedDefinitionFields () {
			if (this.stage && this.stage?.definitionFields) {
				return this.stage.definitionFields(this.characterDefinition);
			}
			return null;
		},
		stageProgress () {
			return `${this.stages.indexOf(this.stageKey) + 1}/${this.stages.length}`;
		}
	},
	mounted () {
		const restoredCharacter = JSON.parse(sessionStorage.getItem("createCharacterStore") || "{}");

		if (restoredCharacter.form) {
			this.characterForm = restoredCharacter.form;
		}
		if (restoredCharacter.freebiesForm) {
			this.freebiesForm = restoredCharacter.freebiesForm;
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
		...mapActions({
			createCharacter: "characters/create"
		}),
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
		updateForm (updatedForm) {
			if (updatedForm) {
				if (this.stage.freebiesMode) {
					this.freebiesForm = { ...updatedForm }
				} else {
					this.characterForm = { ...updatedForm }
				}
			}

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
				freebiesForm: this.freebiesForm,
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
		},
		async onCharacterSubmit () {
			const { sheet } = this.characterForm;
			const { id } = await this.createCharacter({ sheet, xp: {} });

			if (id) {
				sessionStorage.removeItem("createCharacterStore");
				this.$router.push(`/characters/${id}`);
			}
		}
	}
}
</script>
