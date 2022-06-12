import Vue from "vue";

export const updateSessionType = "@session/updateSession";
export const addSessionCharacterType = "@session/addSessionCharacter";
export const removeSessionCharacterType = "@session/removeSessionCharacter";

export default {
	[updateSessionType] (state, { session }) {
		Vue.set(state, "session", session);
	}
}
