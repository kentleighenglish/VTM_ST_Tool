<template>
	<div class="characterSheet">
		<h1 class="characterSheet__title">
			Character Sheet
		</h1>
		<div class="characterSheet__fields">
			<CharacterForm v-model="model.sheet" :read-only="readOnly" @input="updateValue('sheet', $event)" />
		</div>
		<div class="characterSheet__actions">
			<CommonSticky :offset-top="80">
				<CharacterXpPoints :data="model.xp" />
				<CharacterXpHistory :data="model.xp" />
			</CommonSticky>
		</div>
		<div class="characterSheet__meta">
			<CommonSticky :offset-top="80">
				<div
					ref="metaContainer"
					class="characterSheet__metaInner"
					v-html="metaText"
				/>
			</CommonSticky>
		</div>
	</div>
</template>
<script>
import { mapState } from "vuex";

export default {
	name: "CharacterSheet",
	props: {
		readOnly: Boolean,
		value: {
			type: Object,
			default: () => ({})
		}
	},
	data: () => ({
		sheetId: null,
		model: null
	}),
	computed: {
		...mapState({
			metaText ({ characters }) {
				return (characters.metaDisplay.text || "").replaceAll(/[\n\r]/g, "<br>");
			}
		})
	},
	watch: {
		value (v) {
			this.model = v;
		}
	},
	created () {
		this.model = this.value;
	},
	mounted () {
		this.model = this.value;
	},
	methods: {
		updateValue (field, value) {
			this.$emit("input", {
				...this.model,
				[field]: value
			});
		}
	}
}
</script>
<style lang="scss">
.characterSheet {
	display: grid;

	grid-template-rows: auto auto;
	grid-template-columns: 1fr 900px 1fr;
	grid-template-areas:
		". title ."
		"actions fields meta";
	// max-width: 900px;
	// margin: 0 auto;

	h1 {
		grid-area: title;
	}

	&__fields {
		grid-area: fields;
	}

	&__meta {
		position: relative;
		grid-area: meta;
	}

	&__actions {
		position: relative;
		grid-area: actions;
	}

	&__metaInner {
		padding: $gap;
		overflow-x: auto;
	}
}
</style>
