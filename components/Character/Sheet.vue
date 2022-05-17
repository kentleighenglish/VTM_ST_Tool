<template>
	<div class="characterSheet">
		<h1 class="characterSheet__title">
			Character Character
		</h1>
		<div class="characterSheet__fields">
			<CharacterForm v-model="model" :read-only="readOnly" @input="updateValue" />
		</div>
		<div class="characterSheet__actions">
			<CommonSticky :offset-top="80">
				ACTIONS
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
		updateValue (value) {
			this.$emit("input", value);
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
