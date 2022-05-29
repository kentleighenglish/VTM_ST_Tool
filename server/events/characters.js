import * as m from "../mongo";
import humanize from "../../filters/humanize";
import * as discord from "../discord";
import { updateRoom } from "./rooms";

export const create = async ({ socket, callback, data: { sheet, xp } = { sheet: {}, xp: {} } }) => {
	try {
		const response = await m.characters.create({ sheet, xp });

		if (response) {
			callback(null, response);
		} else {
			callback(new Error("Could not create character sheet").message, {});
		}
	} catch (e) {
		callback(e);
	}
}

export const update = async ({ data: { id, sheet, xp }, socket, io, callback }) => {
	try {
		const response = await m.characters.update({ id, sheet, xp });

		if (response) {
			callback(null, response);

			updateRoom({ socket, io, data: { id, updateAvailable: true } });
		} else {
			callback(new Error("Could not update character sheet").message, {});
		}
	} catch (e) {
		callback(e);
	}
}

export const fetch = async ({ data, callback }) => {
	const character = await m.characters.fetch({ id: data.id });

	if (character) {
		callback(null, { character });
	} else {
		callback(new Error("Could not find character").message, { character: null });
	}
}

export const fetchAll = async ({ data, callback }) => {
	const characters = await m.characters.fetchAll();

	if (characters) {
		callback(null, { characters });
	} else {
		callback(null, { characters: [] });
	}
}

export const rewardXp = async ({ socket, io, data = {}, callback }) => {
	const { id, amount } = data;

	if (id && amount) {
		await m.characters.rewardXp({ id, amount });

		updateRoom({ socket, io, data: { id, xpUpdateAvailable: true } });

		await fetch({ data: { id }, callback });
	}
}

export const removeXp = async ({ socket, io, data = {}, callback }) => {
	const { id, amount } = data;

	if (id && amount) {
		await m.characters.removeXp({ id, amount });

		updateRoom({ socket, io, data: { id, xpUpdateAvailable: true } });

		await fetch({ data: { id }, callback });
	}
}

export const saveAction = async ({ socket, io, data = {}, callback }) => {
	const { action } = data;

	const name = humanize(action.name);

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

	const id = action.characterId;
	const thumbnailUrl = `https://vtm.ikengainnovations.com/image/${id}`;

	await discord.sendMessage({
		embeds: [{
			title: name,
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

	callback(null, { action });
}

export const uploadAvatar = async ({ socket, io, data = {}, callback }) => {
	const { id, image } = data;

	try {
		const base64Image = Buffer.from(image).toString("base64");

		const updatedCharacter = await m.characters.uploadAvatar({ id, image: base64Image });

		callback(null, { character: updatedCharacter });
	} catch (err) {
		callback(err, null);
	}
}
