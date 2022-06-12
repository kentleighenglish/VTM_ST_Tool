import { get } from "lodash";
import * as discord from "../discord";
import humanize from "../../filters/humanize";
import * as m from "../mongo";
import { decodeHealthValue, getStats } from "@/utils/parsers";
import { healthLevels } from "@/data/status";
import { rollDice } from "@/data/actions/_utils";
// import * as disciplines from "@/data/advantages/disciplines";
// import * as merits from "@/data/status/merits";
// import * as flaws from "@/data/status/flaws";
import * as actions from "@/data/actions";

const getHealthMod = (sheet) => {
	const healthArray = decodeHealthValue(get(sheet, "status.other.health", null));

	const healthStatus = (healthLevels[healthArray.length - 1] || {});

	return healthStatus.dicePoolMod || 0;
};

const getSuccesses = (diceResult, difficulty = 6) => {
	const successes = diceResult.reduce((acc, roll) => {
		if (roll === 10) {
			acc += 2;
		} else if (roll === 1) {
			acc--;
		} else if (roll >= difficulty) {
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
	const {
		characterId,
		group,
		name,
		type,
		stat1,
		stat2,
		difficulty
		// mods = []
	} = data;

	const character = await m.characters.fetch({ id: characterId });
	const action = get(actions, `${group}.${name}`, null);

	if (!character || !action) {
		callback(new Error("Could not find character"), null);
	}

	const stats = getStats(character.sheet || {});

	let dicePool = stats[stat1] + stats[stat2];

	let success = {};
	let result;

	const healthMod = getHealthMod(character.sheet);

	dicePool = dicePool + healthMod;

	if (type === "custom") {
		result = action.getOutput({ stats: this.stats });
	} else {
		result = rollDice(dicePool);

		success = getSuccesses(result, difficulty);
	}

	const characterName = get(character.sheet, "details.info.name", null);

	const actionPayload = {
		characterName,
		characterId,
		name,
		type,
		result,
		successCount: success.count,
		successStatus: success.status,
		successOutput: success.output,
		timestamp: new Date()
	};

	const actionName = humanize(action.name);

	const description = action.type === "diceRoll"
		? action.result.reduce((acc, num) => ([
			...acc,
			`**${num}**`
		]), []).join(" + ")
		: action.result;

	let successOutput = "```\n" + action.successOutput + "```";

	if (action.successStatus === "botch") {
		successOutput = "```arm\n" + action.successOutput + "```";
	} else if (action.successStatus === "crit") {
		successOutput = "```yaml\n" + action.successOutput + "```";
	}

	const thumbnailUrl = `https://vtm.ikengainnovations.com/image/${characterId}`;

	await discord.sendMessage({
		embeds: [{
			title: actionName,
			author: {
				name: action.characterName
			},
			thumbnail: {
				url: thumbnailUrl
			},
			fields: [{
				name: "Result",
				value: `**${successOutput}**`
			}],
			description,
			timestamp: action.date
		}]
	});

	callback(null, { action: actionPayload });
}
