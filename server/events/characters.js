import * as m from "../mongo";
import { updateRoom } from "./rooms";

export const create = async ({ socket, callback, data = {} }) => {
	try {
		const response = await m.characters.create(data);

		if (response) {
			callback(null, { id: response });
		} else {
			callback(new Error("Could not create character sheet").message, {});
		}
	} catch (e) {
		callback(e);
	}
}

export const update = async ({ data: { _id, sheet }, socket, io, callback }) => {
	try {
		const response = await m.characters.update({ _id, sheet });

		if (response) {
			callback(null, { id: response });

			updateRoom({ socket, io, data: { id: _id, updateAvailable: true } });
		} else {
			callback(new Error("Could not update character sheet").message, {});
		}
	} catch (e) {
		callback(e);
	}
}

export const fetch = async ({ data, callback }) => {
	const character = await m.characters.fetch(data.id);

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
		await m.characters.rewardXp({ _id: id, amount });

		updateRoom({ socket, io, data: { id, xpUpdateAvailable: true } });

		await fetch({ data: { id }, callback });
	}
}
