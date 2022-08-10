import { get, set } from "lodash";
import * as m from "../mongo";
import { triggerAction } from "./actions";

const roomId = id => `sheet_${id}`;

const getRoomSockets = (io, socket = {}) => async (room) => {
	const sockets = await io.in(room).fetchSockets();

	return sockets.reduce((acc, s) => ([
		...acc,
		s.id
	]), []);
}

export const join = async ({ socket, io, data, callback }) => {
	if (data.id) {
		const room = roomId(data.id);
		socket.join(room);

		const sockets = await getRoomSockets(io, socket)(room);

		callback(null, { sockets });
		updateRoom({ socket, io, data });
	}
}

export const leave = ({ socket, io, data, callback }) => {
	if (data.id) {
		const room = roomId(data.id);
		socket.leave(room);

		updateRoom({ socket, io, data });
	}
}

export const updateRoom = async ({ socket, io, data = {} }) => {
	if (data.id) {
		const room = roomId(data.id);

		const sockets = await getRoomSockets(io)(room);
		const updateAvailable = data.updateAvailable || false;
		const xpUpdateAvailable = data.xpUpdateAvailable || false;

		socket.to(room).emit("updateTriggered", { sockets, updateAvailable, xpUpdateAvailable });
	}
}

export const addSessionCharacter = async ({ io, data = {}, callback }) => {
	const session = await m.rooms.fetchSession();

	const characters = (session.characters || []).concat(data.id || []);

	const updatedSession = await m.rooms.updateSession({ ...session, characters });

	io.to("global").emit("sessionUpdated", { session: updatedSession });
	callback(null, {});
}

export const removeSessionCharacter = async ({ socket, io, data = {}, callback }) => {
	const session = await m.rooms.fetchSession();

	const characters = (session.characters || []);
	const index = characters.indexOf(data.id);

	delete session.activeMods[data.id];

	characters.splice(index, 1);

	const updatedSession = await m.rooms.updateSession({ ...session, characters });

	io.to("global").emit("sessionUpdated", { session: updatedSession });
	callback(null, {});
}

export const rollSceneInitiative = async ({ socket, io, callback }) => {
	const session = await m.rooms.fetchSession();

	const characters = (session.characters || []);

	const initiative = {};

	await Promise.all(characters.map(async (id) => {
		try {
			const { result } = await triggerAction({
				data: {
					characterId: id,
					group: "other",
					name: "initiative",
					stat1: "wits",
					stat2: "alertness",
					returnMode: true
				}
			});

			if (result) {
				initiative[id] = result.reduce((acc, num) => acc + num, 0);
			} else {
				initiative[id] = 0;
			}
		} catch (e) {
			// eslint-disable-next-line no-console
			console.error(e);
			initiative[id] = 0;
		}
	}));

	const updatedSession = await m.rooms.updateSession({ ...session, initiative });

	io.to("global").emit("sessionUpdated", { session: updatedSession });
	callback(null, {});
}

export const fetchSession = async ({ callback }) => {
	const session = await m.rooms.fetchSession();

	callback(null, { session });
}

export const resetScene = async ({ io, callback }) => {
	const session = await m.rooms.fetchSession();

	const updatedSession = await m.rooms.updateSession({ ...session, activeMods: {}, initiative: {} });

	io.to("global").emit("sessionUpdated", { session: updatedSession });
	callback(null, {});
}

export const buffAttribute = async ({ io, data = {}, callback }) => {
	const session = await m.rooms.fetchSession();
	const { id, attribute, buffLevel } = data;

	const { activeMods = {} } = session;
	const currentLevel = get(activeMods, `${id}.${attribute}`, 0);
	const newLevel = Number(currentLevel) + Number(buffLevel);

	const newMods = set(activeMods, `${id}.${attribute}`, newLevel);

	const updatedSession = await m.rooms.updateSession({ ...session, activeMods: newMods });

	io.to("global").emit("sessionUpdated", { session: updatedSession });
	callback(null, {});
}
