<template>
	<div class="sessionPage">
		<div class="sessionPage__characters">
			<div v-if="!sessionCharacters.length">
				No characters in session
			</div>
			<div
				v-for="c in sessionCharacters"
				:key="c.id"
				:class="characterClass([selectedCharacterId], c)"
				@click="selectCharacter(c.id)"
			>
				<div class="character__avatar">
					<img :src="c.image" :width="40">
				</div>
				<div class="character__name">
					<span>{{ c.name }}</span>
				</div>
				<div class="character__remove" @click.stop="removeCharacter(c.id)">
					<CommonIcon>cancel</CommonIcon>
				</div>
			</div>
		</div>
		<div class="sessionPage__charName">
			<h2 v-if="selectedCharacter">
				{{ selectedCharacter.name }}
			</h2>
		</div>
		<div class="sessionPage__controls">
			<CommonButton state="primary" @click="openModal('addSessionCharacter')">
				Add Characters
			</CommonButton>
			<CommonButton state="primary" @click="resetScene">
				Reset Scene
			</CommonButton>
		</div>
		<div class="sessionPage__actions">
			<GlobalActions v-if="selectedCharacter" :character-id="selectedCharacterId" />
		</div>

		<CommonModal
			name="addSessionCharacter"
			confirm-label="Add Characters"
			:confirm="addCharacters"
			:close="resetAddCharacters"
		>
			<div class="addCharactersList">
				<div
					v-for="c in sessionAddCharacters"
					:key="c.id"
					:class="characterClass(charactersToAdd, c)"
					@click="toggleCharacterToAdd(c.id)"
				>
					<div class="character__avatar">
						<img :src="c.image" :width="40">
					</div>
					<div class="character__name">
						<span>{{ c.name }}</span>
					</div>
				</div>
			</div>
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
		selectedCharacterId: null,
		charactersToAdd: []
	}),
	computed: {
		...mapState({
			characters ({ characters: { characters = [] } }) {
				return characters;
			},
			session ({ session: { session } }) {
				return session;
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
				return this.session.characters.includes(char.id);
			});
		},
		sessionAddCharacters () {
			return this.parsedCharacters.filter((char) => {
				return !this.session.characters.includes(char.id);
			});
		}
	},
	mounted () {
		this.onLoad();
	},
	methods: {
		...mapActions({
			openModal: "openModal",
			loadAll: "characters/loadAll",
			loadSession: "session/fetchSession",
			addSessionCharacter: "session/addSessionCharacter",
			removeSessionCharacter: "session/removeSessionCharacter",
			resetScene: "session/resetScene"
		}),
		onLoad () {
			this.loadAll({ filter: this.filter });
			this.loadSession();
		},
		characterClass (selected = [], char) {
			return makeClassMods("sessionPage__character", {
				selected: char => selected.includes(char.id)
			}, char)
		},
		selectCharacter (id) {
			this.selectedCharacterId = id;
		},
		resetAddCharacters () {
			this.charactersToAdd = [];
		},
		addCharacters () {
			this.addSessionCharacter({ id: this.charactersToAdd });
			this.resetAddCharacters();
		},
		removeCharacter (id) {
			this.removeSessionCharacter({ id });
		},
		toggleCharacterToAdd (id) {
			const index = this.charactersToAdd.indexOf(id);

			if (index === -1) {
				this.charactersToAdd.push(id);
			} else {
				this.charactersToAdd.splice(index, 1);
			}
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
	grid-gap: $gap;

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

	&__controls {
		display: flex;
		grid-area: controls;
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
			display: flex;
			width: 100%;
			margin-left: math.div($gap, 2);
		}

		.character__remove {
			cursor: pointer;
			opacity: 0;
			pointer-events: none;

			.icon {
				z-index: 10;
				color: $danger;
			}
		}

		&:hover {
			.character__remove {
				opacity: 1;
				pointer-events: all;
			}
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
