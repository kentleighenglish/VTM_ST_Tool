import * as m from "./mongo";

export const createSheet = async ({ socket, callback, data = {} }) => {
	try {
		const response = await m.sheets.createSheet(data);

		if (response) {
			callback({ id: response });
		} else {
			throw "Could not create character sheet";
		}
	} catch(e) {
		callback({ error: e });
	}
}

export const updateSheet = async () => {

}

export const loadSheet = async ({ data, callback }) => {
	const sheet = await m.sheets.loadSheet(data.id);

	if (sheet) {
		callback({ sheet });
	} else {
		callback({ sheet: null });
	}
}
