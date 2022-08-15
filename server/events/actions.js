import { get } from "lodash";
import * as discord from "../discord";
import humanize from "../../filters/humanize";
import * as m from "../mongo";
import debug from "../debug";

import { getHealthMod, getStats, getCharacterName } from "@/utils/parsers";
import { rollDice } from "@/data/actions/_utils";
import * as disciplines from "@/data/advantages/disciplines";
import * as merits from "@/data/status/merits";
import * as flaws from "@/data/status/flaws";
import * as skills from "@/data/abilities/skills";
import * as knowledges from "@/data/abilities/knowledges";
import actions from "@/data/actions";

const skillsList = Object.keys(skills);
const knowledgesList = Object.keys(knowledges);

const modsList = {
	...disciplines,
	...merits,
	...flaws
};

const getRollData = async ({
	characterId,
	group,
	name,
	type,
	stat1,
	stat2,
	difficulty = 6,
	mods = []
}) => {
	const session = await m.rooms.fetchSession();
	const character = await m.characters.fetch({ id: characterId });
	const action = get(actions, `${group}.${name}`, null);
	let successModifier = 0;
	let botchModifier = 0;

	const activeMods = get(session.activeMods, characterId, {});

	if (!character || !action) {
		throw new Error(character ? "No matching action found" : "Could not find character");
	}
	const stats = getStats(character.sheet || {});

	let dicePool = get(stats, stat1, 0) + get(stats, stat2, 0);

	if (activeMods[stat1]) {
		dicePool += (activeMods[stat1] || 0);
	}
	if (activeMods[stat2]) {
		dicePool += (activeMods[stat2] || 0);
	}

	const healthMod = getHealthMod(character.sheet);

	if (mods && mods.length) {
		mods.forEach((modKey) => {
			const mod = modsList[modKey];
			if (mod && mod.rollModifier) {
				const {
					pool: poolMod = 0,
					difficulty: diffMod = 0,
					success: successMod = 0,
					botch: botchMod = 0
				} = mod.rollModifier({ sheet: character.sheet });

				dicePool += poolMod;
				difficulty += diffMod;
				successModifier += successMod;
				botchModifier += botchMod;
			}
		});
	}

	if (skillsList.includes(stat1) || skillsList.includes(stat2)) {
		if (stats[stat1] === 0 || stats[stat2] === 0) {
			difficulty++;
		}
	}

	dicePool = Math.max(dicePool + healthMod, 1);
	difficulty = Math.min(Math.max(difficulty, 1), 10);

	if (knowledgesList.includes(stat1) || knowledgesList.includes(stat2)) {
		if (stats[stat1] === 0 || stats[stat2] === 0) {
			throw new Error("You do not possess the knowledges required to make this roll.");
		}
	}

	return {
		character,
		activeMods,
		action,
		stats,
		dicePool,
		difficulty,
		successModifier,
		botchModifier
	};
}

const getSuccesses = (diceResult, difficulty = 6, successModifier = 0, botchModifier = 0) => {
	const successes = diceResult.reduce((acc, roll) => {
		if (roll === 10) {
			acc += 2;
		} else if (roll === 1) {
			if (botchModifier > 0) {
				botchModifier--;
			} else {
				acc--;
			}
		} else if (roll >= difficulty) {
			acc++;
		} else if (roll < difficulty && successModifier > 0) {
			successModifier--;
			acc++;
		}

		return acc;
	}, 0);

	const crit = successes > 5;
	const botch = successes < 0;

	return {
		count: successes,
		status: (!crit && !botch) ? null : (crit ? "crit" : "botch"),
		output: successes < 0 ? "Botch" : `${successes} Success${successes === 1 ? "" : "es"}`
	};
};

export const triggerAction = async ({ socket, io, data = {}, callback }) => {
	try {
		const {
			characterId,
			name,
			type = "diceRoll",
			mods = [],
			returnMode = false
		} = data;

		const {
			action,
			character,
			stats,
			dicePool,
			successModifier,
			botchModifier,
			difficulty
		} = await getRollData(data);

		let success = {};
		let result;

		if (type === "custom") {
			result = action.getOutput({ sheet: character.sheet, stats, dicePool, mods });
		} else {
			result = rollDice(dicePool);

			success = getSuccesses(result, difficulty, successModifier, botchModifier);
		}

		if (returnMode) {
			return {
				result,
				success
			}
		}

		const characterName = getCharacterName(character);

		const actionName = humanize(name);

		const description = type === "diceRoll"
			? result.reduce((acc, num) => ([
				...acc,
				`**${num}**`
			]), []).join(" + ")
			: result;

		let successOutput;
		if (type === "diceRoll") {
			successOutput = "```\n" + success.output + "```";

			if (success.status === "botch") {
				successOutput = "```arm\n" + success.output + "```";
			} else if (success.status === "crit") {
				successOutput = "```yaml\n" + success.output + "```";
			}
		}

		const thumbnailUrl = `https://vtm.ikengainnovations.com/image/${characterId}`;
		const timestamp = new Date();

		await discord.sendMessage({
			embeds: [{
				title: actionName,
				author: {
					name: characterName
				},
				thumbnail: {
					url: thumbnailUrl
				},
				fields: successOutput
					? [{
						name: "Result",
						value: `**${successOutput}**`
					}]
					: [],
				description,
				timestamp
			}]
		});

		const actionResponse = {
			characterName,
			characterId,
			name,
			type,
			result,
			successCount: success.count,
			successStatus: success.status,
			successOutput: success.output,
			timestamp
		};

		if (action.afterTrigger) {
			await action.afterTrigger({ ...actionResponse, mongo: m, io, socket });
		}

		callback(null, { action: actionResponse });
	} catch (e) {
		debug("events:actions", true)("ERROR", e);
		if (!data?.returnMode) {
			callback(e.message, null);
		}
	}
}

export const getActionCalc = async ({ socket, io, data = {}, callback }) => {
	try {
		const { dicePool, difficulty } = await getRollData(data) || {};

		callback(null, {
			dicePool,
			difficulty
		});
	} catch (e) {
		debug("events:actions", true)("ERROR", e);
		callback(e.message, null);
	}
}
