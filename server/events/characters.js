import { set } from "lodash";
import * as m from "../mongo";
import { updateRoom } from "./rooms";

export const create = async ({ socket, callback, data: { sheet, xp, chronicle } = { sheet: {}, xp: {} } }) => {
	try {
		const id = await m.characters.create({ sheet, xp, chronicle });

		if (id) {
			callback(null, { id });
		} else {
			callback(new Error("Could not create character sheet").message, {});
		}
	} catch (e) {
		callback(e);
	}
}

export const update = async ({ data: { id, sheet, xp, chronicle }, socket, io, callback }) => {
	try {
		const response = await m.characters.update({ id, sheet, xp, chronicle });

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

export const duplicate = async ({ data, socket, io, callback }) => {
	try {
		const character = await m.characters.fetch({ id: data.id });

		if (character) {
			const { sheet, image, chronicle } = character;

			const name = sheet?.details?.info?.name;

			const newName = name.trim() + " (Copy)";

			set(sheet, "details.info.name", newName);
			const id = await m.characters.create({ sheet, image, xp: {}, chronicle });

			character.id = id;
			character.sheet = sheet;

			if (id) {
				callback(null, { character });
			}
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
