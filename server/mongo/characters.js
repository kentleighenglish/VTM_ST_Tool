import { v4 as uuidv4 } from "uuid";
import { merge } from "lodash";
import debug from "../debug";
import * as cache from "../cache";
import { run } from "./_utils";

const COLLECTION = "characters";
const MERGED_COLLECTION = "charactersMerged";
const CACHE_NAME = "characters";

cache.createCache(CACHE_NAME);

const groupRevisions = (items = []) => items.reduce((acc, item) => ({
	...acc,
	[item.id]: {
		id: item.id,
		revisionNumber: item.revisionNumber,
		sheet: merge(acc[item.id]?.sheet || {}, item.sheet),
		xp: merge(acc[item.id]?.xp || {}, item.xp),
		image: item?.image || acc[item.id]?.image
	}
}), {});

const updateMergedCharacter = async ({ id }) => {
	const response = await run(db =>
		db.collection(COLLECTION).find({ id }).toArray()
	);

	let grouped;
	if (response.length) {
		grouped = groupRevisions(response);
	} else {
		return;
	}

	const { ...newChar } = (grouped[id] || {});

	await run(
		db =>
			new Promise((resolve, reject) =>
				db.collection(MERGED_COLLECTION).updateOne(
					{ id },
					{ $set: newChar },
					{ upsert: true },
					(err, result) => (err ? reject(err) : resolve(result.insertedId))
				)
			)
	);
}

export const create = async ({ sheet, xp }) => {
	try {
		const id = uuidv4();

		const response = await run(
			db =>
				new Promise((resolve, reject) =>
					db.collection(COLLECTION).insertOne(
						{ id, sheet, xp, revisionNumber: 1 },
						(err, result) => (err ? reject(err) : resolve(result.insertedId))
					)
				)
		);

		if (response) {
			return id;
		}

		return null;
	} catch (e) {
		debug("db:characters", true)("ERROR", e);
		return null;
	}
};

export const update = async ({ id, sheet, xp, image }) => {
	try {
		const { revisionNumber } = await fetch({ id });

		const response = await run(
			db =>
				new Promise((resolve, reject) =>
					db.collection(COLLECTION).insertOne(
						{ id, sheet, xp, image, revisionNumber: revisionNumber + 1 },
						(err, result) => (err ? reject(err) : resolve(result.insertedId))
					)
				)
		);

		if (response) {
			await updateMergedCharacter({ id });
			cache.del(CACHE_NAME, cacheKey);

			return await fetch({ id });
		}

		return null;
	} catch (e) {
		return null;
	}
};

export const fetch = async ({ id, fields }, retry = true) => {
	try {
		const projectedFields = (fields || {
			_id: 1,
			id: 1,
			sheet: 1,
			xp: 1,
			revisionNumber: 1,
			image: 1
		});

		const cacheKey = `character_${id}_${JSON.stringify(projectedFields)}`;
		const hit = cache.get(CACHE_NAME, cacheKey);
		if (hit) {
			return hit;
		}

		const mergedResponse = await run(db =>
			db.collection(MERGED_COLLECTION).findOne({ id }, projectedFields)
		);

		if (false && mergedResponse) {
			cache.set(CACHE_NAME, cacheKey, mergedResponse);

			return mergedResponse;
		} else {
			await updateMergedCharacter({ id });
			const response = await run(db => db.collection(MERGED_COLLECTION).findOne({ id }, projectedFields));

			cache.set(CACHE_NAME, cacheKey, response);

			if (response) {
				return response
			}
		}

		return null;
	} catch (e) {
		debug("db:characters", true)("ERROR", e);
		return null;
	}
}

export const fetchAll = async () => {
	try {
		const hit = cache.get(CACHE_NAME, "characters");
		if (hit) {
			return hit;
		}

		const response = await run(db => db.collection(MERGED_COLLECTION).find({}).toArray());

		if (response && response.length) {
			cache.set(CACHE_NAME, "characters", response);

			return response;
		}

		return [];
	} catch (e) {
		return [];
	}
};

export const rewardXp = async ({ id, amount }) => {
	try {
		const current = await fetch({ id });

		const availablePoints = current?.xp?.availablePoints || 0;

		const response = await update({ id, xp: { availablePoints: availablePoints + 1 } });

		if (response) {
			return response;
		}

		return null;
	} catch (e) {
		return null;
	}
};

export const removeXp = async ({ id, amount }) => {
	try {
		const current = await fetch({ id });

		const availablePoints = current?.xp?.availablePoints || 0;

		const response = await update({ id, xp: { availablePoints: Math.max(availablePoints - 0, 0) } });

		if (response) {
			return response;
		}

		return null;
	} catch (e) {
		return null;
	}
};

export const uploadAvatar = async ({ id, image }) => {
	try {
		const response = await update({ id, image });
		cache.del(CACHE_NAME, `avatar_${id}`);

		if (response) {
			return response;
		}

		return null;
	} catch (e) {
		return null;
	}
};

export const getAvatar = async ({ id }) => {
	try {
		const hit = cache.get(CACHE_NAME, `avatar_${id}`);
		if (hit) {
			return hit;
		}

		const response = await fetch({ id }, { image: 1 });

		if (response) {
			cache.set(CACHE_NAME, `avatar_${id}`, response.image);

			return response.image;
		}

		return null;
	} catch (e) {
		return null;
	}
};
