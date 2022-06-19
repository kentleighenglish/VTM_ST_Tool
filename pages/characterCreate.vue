<template>
	<div class="characterCreate">
		<CharacterSheet
			v-if="currentSkeleton"
			v-model="newCharacterForm"
			:create-mode="true"
			:skeleton="currentSkeleton"
			:xp-disabled="true"
			@input="checkForm"
		>
			<template #title>
				{{ stage.title || "Create Character" }}
			</template>
			<template #subtitle>
				{{ stage.subtitle }}
			</template>
		</CharacterSheet>
		<div class="contentContainer">
			<hr>
			<div class="st-flex st-align-end">
				<CommonButton state="primary" :disabled="!stageComplete">Previous Stage</CommonButton>
				<CommonButton state="primary" :disabled="!stageComplete">Next Stage</CommonButton>
			</div>
		</div>
	</div>
</template>
<script>
import * as stages from "@/data/characterCreation/stages";

export default {
	name: "CharacterCreatePage",
	data: () => ({
		newCharacterForm: {},
		currentStage: null,
		stageComplete: false
	}),
	head: {
		title: "Create Character"
	},
	computed: {
		stage () {
			return (stages[this.currentStage] || {});
		},
		currentSkeleton () {
			if (this.currentStage && this.stage) {
				return {
					[this.currentStage]: this.stage.fields
				};
			}

			return null;
		}
	},
	mounted () {
		this.currentStage = Object.keys(stages)[0];
	},
	methods: {
		checkForm () {
			if (this.stage.stageComplete) {
				this.stageComplete = this.stage.stageComplete(this.newCharacterForm);
			}
		}
	}
}
</script>
