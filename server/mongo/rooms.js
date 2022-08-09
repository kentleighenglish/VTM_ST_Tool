import { cloneDeep, merge } from "lodash";
import { run } from "./_utils";

const COLLECTION = "rooms";
const defaultSession = {
	characters: [],
	initiative: {},
	activeMods: {}
}

export const updateSession = async (session = {}) => {
	try {
		await run(
			db =>
				new Promise((resolve, reject) =>
					db.collection(COLLECTION).updateOne(
						{ ref: "session" },
						{ $set: session },
						{ upsert: true },
						(err, result) => (err ? reject(err) : resolve(result.insertedId))
					)
				)
		);

		return await fetchSession();
	} catch (e) {
		return null;
	}
};

export const fetchSession = async () => {
	try {
		const session = await run(db => db.collection(COLLECTION).findOne({ ref: "session" }));

		const response = merge(cloneDeep(defaultSession), session);

		if (response) {
			return await response;
		}

		return cloneDeep(defaultSession);
	} catch (e) {
		return cloneDeep(defaultSession);
	}
}
