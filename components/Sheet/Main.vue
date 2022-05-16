<template>
	<div class="sheetMain">
		<h1 class="sheetMain__title">
			Character sheet
		</h1>
		<div class="sheetMain__fields">
			<SheetFormCompleteSheet v-model="model" :read-only="readOnly" @input="updateValue" />
		</div>
		<div class="sheetMain__actions">
			<CommonSticky :offset-top="40">
				ACTIONS
			</CommonSticky>
		</div>
		<div class="sheetMain__meta">
			<CommonSticky :offset-top="40">
				<div
					ref="metaContainer"
					class="sheetMain__metaInner"
					v-html="metaText"
				/>
			</CommonSticky>
		</div>
	</div>
</template>
<script>
import { mapState } from "vuex";

export default {
	name: "SheetMain",
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
			metaText ({ sheets }) {
				return (sheets.metaDisplay.text || "").replaceAll(/[\n\r]/g, "<br>");
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
.sheetMain {
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
