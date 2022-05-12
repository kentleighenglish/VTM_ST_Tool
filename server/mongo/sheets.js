import { ObjectID } from "mongodb";
import debug from "../debug";
import { run } from "./_utils";

const COLLECTION = "sheets";

export const create = async (sheet) => {
	try {
		const response = await run(
			(db) =>
			new Promise((resolve, reject) =>
				db.collection(COLLECTION).insertOne(
					sheet,
					(err, result) => (err ? reject(err) : resolve(result.insertedId))
				)
			)
		);

		if (response) {
			return response;
		}

		return null;
	} catch (e) {
		debug("db:sheets", true)("ERROR", e);
		return null;
	}
};

export const update = async ({ _id, sheet }) => {
	try {
		const response = await run((db) =>
			db.collection(COLLECTION).updateOne({ _id: ObjectID(_id) }, { $set: { sheet } })
		);

		if (response) {
			return response;
		}

		return null;
	} catch (e) {
		return null;
	}
};

export const fetch = async (id) => {
	try {
		const response = await run(db => new Promise((resolve, reject) => {
			db.collection(COLLECTION).findOne(
				{ _id: ObjectID(id) },
				(err, result) => (err ? reject(err) : resolve(result))
			);
		}));

		if (response) {
			return response;
		}

		return null;
	} catch (e) {
		debug("db:sheets", true)("ERROR", e);
		return null;
	}
}


export const fetchAll = async () => {
	try {
		const response = await run(db => db.collection(COLLECTION).find({}).toArray());

		if (response) {
			return response;
		}

		return [];
	} catch (e) {
		return [];
	}
};
