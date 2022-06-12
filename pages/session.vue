<template>
	<div class="sessionPage">
		<div class="sessionPage__characters">
			<div v-for="c in sessionCharacters" :key="c.id" :class="characterClass(c)" @click="selectedCharacterId = c.id">
				<div class="character__avatar">
					<img :src="c.image" :width="40">
				</div>
				<div class="character__name">
					<span>{{ c.name }}</span>
				</div>
			</div>
		</div>
		<div class="sessionPage__charName">
			<h2 v-if="selectedCharacter">
				{{ selectedCharacter.name }}
			</h2>
		</div>
		<div class="sessionPage__actions">
			<GlobalActions v-if="selectedCharacter" :character-id="selectedCharacter" />
		</div>

		<CommonModal name="addSessionCharacter">
		</CommonModal>
	</div>
</template>
<script>
import { get } from "lodash";
import { mapState, mapActions } from "vuex";
import { makeClassMods } from "@/mixins/classModsMixin";

export default {
	name: "SessionPage",
	data: () => ({
		filter: {},
		selectedCharacterId: null
	}),
	computed: {
		...mapState({
			characters ({ characters: { characters = [] } }) {
				return characters;
			}
		}),
		parsedCharacters () {
			return (this.characters || []).reduce((acc, { id, ...character }) => ([
				...acc,
				{
					...character,
					id,
					image: `/image/${id}`,
					name: get(character, "sheet.details.info.name", null)
				}
			]), []);
		},
		selectedCharacter () {
			return this.parsedCharacters.find(c => c.id === this.selectedCharacterId);
		},
		sessionCharacters () {
			return this.parsedCharacters.filter((char) => {
				return !!char.id;
			});
		},
		sessionAddCharacters () {
			return this.parsedCharacters.filter((char) => {
				return !!char.id;
			});
		}
	},
	mounted () {
		this.onLoad();
	},
	methods: {
		...mapActions({
			loadAll: "characters/loadAll"
		}),
		onLoad () {
			this.loadAll({ filter: this.filter });
		},
		characterClass (char) {
			return makeClassMods("sessionPage__character", {
				selected: char => char.id === this.selectedCharacter
			}, char)
		}
	}
}
</script>
<style lang="scss">
.sessionPage {
	display: grid;
	grid-template-areas: "characters controls"
	"characters charName"
	"characters actions";
	grid-template-columns: 400px minmax(0, 1fr);
	grid-template-rows: auto minmax(0, 1fr);

	&__characters {
		display: flex;
		width: 100%;
		height: 100%;
		max-height: 100%;
		overflow: hidden;

		flex-direction: column;
		grid-area: characters;
		padding: $gap;

		@include realShadow($grey-dark);
		background: $grey-lighter;
		border-radius: $global-border-radius;
	}

	&__character {
		display: flex;
		margin: math.div($gap, 4) 0;
		padding: 0 math.div($gap, 2);
		align-items: center;
		border: 4px solid transparent;
		border-top-width: 0px;
		border-bottom-width: 0px;

		.character__avatar {
			display: flex;
		}

		.character__name {
			margin-left: math.div($gap, 2);
		}

		&--selected {
			border-color: $primary;
		}
	}

	&__charName {
		grid-area: charName;
		padding-left: $gap;

		h2 {
			margin: 0;
		}
	}

	&__actions {
		grid-area: actions;

		.globalActions {
			padding-top: 0;
		}
	}
}
</style>
