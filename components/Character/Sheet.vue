<template>
	<div class="characterSheet">
		<div class="characterSheet__title">
			<h1>
				<slot name="title" />
			</h1>
			<h4 v-if="$slots.subtitle" class="characterSheet__subtitle">
				<slot name="subtitle" />
			</h4>
		</div>
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
				:active-mods="activeMods"
				:skeleton="skeleton"
				@input="updateValue('sheet', $event)"
			/>
		</div>
		<div class="characterSheet__xp">
			<CommonSticky v-if="!xpDisabled" :offset-top="80">
				<CharacterXpPoints :data="model.xp" />
				<CharacterXpHistory :data="model.xp" />
			</CommonSticky>
		</div>
		<div class="characterSheet__meta">
			<CommonSticky :offset-top="80" :overflow-scroll="true">
				<CharacterMetaContainer :xp-disabled="xpDisabled" />
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
		},
		xpSpendReset: {
			type: Function,
			default: () => {}
		},
		activeMods: {
			type: Object,
			default: () => ({})
		},
		skeleton: {
			type: Object,
			default: () => ({})
		},
		xpDisabled: {
			type: Boolean,
			default: false
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

	&__title {
		grid-area: title;
		padding: math.div($gap, 2) $gap;

		h1, h4 {
			margin: 0;
		}
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
