<template>
	<div class="characterSheet">
		<h1 class="characterSheet__title">
			Character Sheet
		</h1>
		<div class="characterSheet__fields">
			<CharacterForm
				v-model="model.sheet"
				:xp="model.xp"
				:create-mode="createMode"
				:admin-mode="adminMode"
				:xp-check="xpCheck"
				:xp-spend-update="xpSpendUpdate"
				:xp-spend-reset="xpSpendReset"
				:original-value="originalValue.sheet"
				@input="updateValue('sheet', $event)"
			/>
		</div>
		<div class="characterSheet__xp">
			<CommonSticky :offset-top="80">
				<CharacterXpPoints :data="model.xp" />
				<CharacterXpHistory :data="model.xp" />
			</CommonSticky>
		</div>
		<div class="characterSheet__meta">
			<CommonSticky :offset-top="80" :overflow-scroll="true">
				<CharacterMetaContainer />
			</CommonSticky>
		</div>
	</div>
</template>
<script>
export default {
	name: "CharacterSheet",
	props: {
		createMode: Boolean,
		adminMode: Boolean,
		value: {
			type: Object,
			default: () => ({})
		},
		originalValue: {
			type: Object,
			default: () => ({})
		},
		xpCheck: {
			type: Function,
			default: () => {}
		},
		xpSpendUpdate: {
			type: Function,
			default: () => {}
		}
	},
	data: () => ({
		sheetId: null,
		model: null
	}),
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
	padding-top: $gap * 2;

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

	&__xp {
		position: relative;
		grid-area: actions;
	}
}
</style>
