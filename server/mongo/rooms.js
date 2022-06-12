import { merge } from "lodash";
// import debug from "../debug";
// import * as cache from "../cache";
import { run } from "./_utils";

const COLLECTION = "rooms";
// const CACHE_NAME = "rooms";

// cache.createCache(CACHE_NAME);

const defaultSession = {
	characters: [],
	activeMods: {}
}

export const updateSession = async (session = {}) => {
	try {
		const response = await run(
			db =>
				new Promise((resolve, reject) =>
					db.collection(COLLECTION).updateOne(
						{ ref: "session" },
						{ $set: session },
						(err, result) => (err ? reject(err) : resolve(result.insertedId))
					)
				)
		);

		if (response) {
			return await fetchSession();
		}

		return null;
	} catch (e) {
		return null;
	}
};

export const fetchSession = async () => {
	try {
		const session = await run(db => db.collection(COLLECTION).findOne({ ref: "session" }));

		const response = merge(defaultSession, session);

		if (response) {
			return await response;
		}

		return defaultSession;
	} catch (e) {
		return defaultSession;
	}
}
