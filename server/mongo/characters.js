import { ObjectID } from "mongodb";
import debug from "../debug";
import { run } from "./_utils";

const COLLECTION = "characters";

export const create = async ({ sheet, xp }) => {
	try {
		const response = await run(
			db =>
				new Promise((resolve, reject) =>
					db.collection(COLLECTION).insertOne(
						{ sheet, xp },
						(err, result) => (err ? reject(err) : resolve(result.insertedId))
					)
				)
		);

		if (response) {
			return response;
		}

		return null;
	} catch (e) {
		debug("db:characters", true)("ERROR", e);
		return null;
	}
};

export const update = async ({ _id, sheet, xp }) => {
	try {
		const response = await run(db =>
			db.collection(COLLECTION).updateOne({ _id: ObjectID(_id) }, { $set: { sheet, xp } })
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
		debug("db:characters", true)("ERROR", e);
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

export const rewardXp = async ({ _id, amount }) => {
	try {
		const response = await run(db =>
			db.collection(COLLECTION).updateOne(
				{ _id: ObjectID(_id) },
				{ $inc: { "xp.availablePoints": amount } },
				{ upsert: true }
			)
		);

		if (response) {
			return response;
		}

		return null;
	} catch (e) {
		return null;
	}
};
