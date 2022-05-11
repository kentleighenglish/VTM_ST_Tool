import * as m from "../mongo";

export const create = async ({ socket, callback, data = {} }) => {
	try {
		const response = await m.sheets.create(data);

		if (response) {
			callback({ id: response });
		} else {
			throw "Could not create character sheet";
		}
	} catch(e) {
		callback({ error: e });
	}
}

export const update = async () => {

}

export const fetch = async ({ data, callback }) => {
	const sheet = await m.sheets.fetch(data.id);

	if (sheet) {
		callback({ sheet });
	} else {
		callback({ sheet: null });
	}
}

export const fetchAll = async ({ data, callback }) => {
	const sheets = await m.sheets.fetchAll();

	if (sheets) {
		callback({ sheets });
	} else {
		callback({ sheets: [] });
	}
}
