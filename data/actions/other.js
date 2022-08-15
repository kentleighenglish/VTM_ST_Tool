import { rollDice } from "@/data/actions/_utils";

export const initiative = {
	type: "custom",
	rollStats: ["wits", "alertness"],
	getOutput: ({ stats, sheet, dicePool, mods }) => {
		const result = rollDice(dicePool);

		const initiativeResult = result.reduce((acc, dice) => acc + dice, 0);

		return initiativeResult;
	},
	afterTrigger: async ({ characterId, result, mongo, io }) => {
		// updates the session with the users initiative value
		const session = await mongo.rooms.fetchSession();

		const { initiative = {} } = session;

		initiative[characterId] = result;

		const updatedSession = await mongo.rooms.updateSession({ ...session, initiative });
		io.to("global").emit("sessionUpdated", { session: updatedSession });
	}
};

export const customRoll = {
	type: "diceRoll",
	rollStats: []
};

export const rotschreck = {
	type: "diceRoll",
	rollStats: ["willpower"]
};

export const frenzy = {
	type: "diceRoll",
	rollStats: ["selfControl"]
};
