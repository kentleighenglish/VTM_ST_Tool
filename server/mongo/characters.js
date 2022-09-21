import { v4 as uuidv4 } from "uuid";
import { merge } from "lodash";
import sharp from "sharp";
import debug from "../debug";
import * as cache from "../cache";
import { run } from "./_utils";

const COLLECTION = "characters";
const MERGED_COLLECTION = "charactersMerged";
const AVATAR_COLLECTION = "characterAvatars";
const CHARACTER_CACHE = "characters";
const AVATAR_CACHE = "avatars";

cache.createCache(CHARACTER_CACHE);
cache.createCache(AVATAR_CACHE);

const reduceImageSize = async (base64image) => {
	const img = Buffer.from(base64image, "base64");
	const resizedBuffer = await sharp(img).resize(256, 256).toBuffer();

	const resizedImageData = resizedBuffer.toString("base64");

	return resizedImageData;
}

const groupRevisions = (items = []) => items.reduce((acc, item) => ({
	...acc,
	[item.id]: {
		id: item.id,
		revisionNumber: item.revisionNumber,
		sheet: merge(acc[item.id]?.sheet || {}, item.sheet),
		xp: merge(acc[item.id]?.xp || {}, item.xp),
		chronicle: merge(acc[item.id]?.chronicle || {}, item.chronicle),
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

export const create = async ({ sheet, xp, chronicle }) => {
	try {
		const id = uuidv4();

		const response = await run(
			db =>
				new Promise((resolve, reject) =>
					db.collection(COLLECTION).insertOne(
						{ id, sheet, xp, chronicle, revisionNumber: 1 },
						(err, result) => (err ? reject(err) : resolve(id))
					)
				)
		);

		if (response) {
			await cache.del(CHARACTER_CACHE, "characters");
			await updateMergedCharacter({ id });
			await cache.del(CHARACTER_CACHE, `character_${id}}`);

			return id;
		}

		return null;
	} catch (e) {
		debug("db:characters", true)("ERROR", e);
		return null;
	}
};

export const update = async ({ id, sheet, xp, chronicle, image }) => {
	try {
		const { revisionNumber } = await fetch({ id });

		const response = await run(
			db =>
				new Promise((resolve, reject) =>
					db.collection(COLLECTION).insertOne(
						{ id, sheet, xp, chronicle, image, revisionNumber: revisionNumber + 1 },
						(err, result) => (err ? reject(err) : resolve(result.insertedId))
					)
				)
		);

		if (response) {
			await updateMergedCharacter({ id });
			await cache.del(CHARACTER_CACHE, `character_${id}}`);
			await cache.del(CHARACTER_CACHE, "characters");

			return await fetch({ id });
		}

		return null;
	} catch (e) {
		return null;
	}
};

export const remove = async ({ id }) => {
	try {
		const response = await run(
			db => new Promise((resolve, reject) => {
				db.collection(COLLECTION).deleteMany({ id }, (err) => {
					if (err) {
						reject(err);
					} else {
						db.collection(MERGED_COLLECTION).deleteMany({ id }, (err) => {
							if (err) {
								reject(err);
							} else {
								db.collection(AVATAR_COLLECTION).deleteMany({ id }, (err) => {
									if (err) {
										reject(err);
									} else {
										resolve(true);
									}
								});
							}
						});
					}
				});
			})
		);

		if (response) {
			await cache.del(CHARACTER_CACHE, `character_${id}}`);
			await cache.del(CHARACTER_CACHE, "characters");
			await cache.del(AVATAR_CACHE, `avatar_${id}`);

			return true;
		}

		return false;
	} catch (e) {
		console.error(e);
		throw new Error(e);
	}
};

export const fetch = async ({ id }, retry = true) => {
	try {
		const cacheKey = `character_${id}}`;
		const hit = await cache.get(CHARACTER_CACHE, cacheKey);
		if (hit) {
			return hit;
		}

		const mergedResponse = await run(db =>
			db.collection(MERGED_COLLECTION).findOne({ id })
		);

		if (mergedResponse) {
			await cache.set(CHARACTER_CACHE, cacheKey, mergedResponse);

			return mergedResponse;
		} else {
			await updateMergedCharacter({ id });
			const response = await run(db => db.collection(MERGED_COLLECTION).findOne({ id }));

			await cache.set(CHARACTER_CACHE, cacheKey, response);

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

export const fetchAll = async (filter = {}) => {
	try {
		const hit = await cache.get(CHARACTER_CACHE, "characters");
		if (hit) {
			return hit;
		}

		const response = await run(db => db.collection(MERGED_COLLECTION)
			.find(filter)
			.project({
				id: 1,
				sheet: 1,
				xp: 1,
				chronicle: 1
			})
			.toArray()
		);

		if (response && response.length) {
			await cache.set(CHARACTER_CACHE, "characters", response);

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

		const response = await update({ id, xp: { availablePoints: Math.max(availablePoints - 1, 0) } });

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
		await cache.del(AVATAR_CACHE, `avatar_${id}`);

		const reducedImage = await reduceImageSize(image);

		await run(
			db =>
				new Promise((resolve, reject) =>
					db.collection(AVATAR_COLLECTION).updateOne(
						{ id },
						{ $set: { id, image: reducedImage } },
						{ upsert: true }
					)
				)
		);

		const response = await getAvatar({ id });

		if (response) {
			return response;
		}

		return null;
	} catch (e) {
		debug("db:characters", true)("ERROR", e);
		return null;
	}
};

export const getAvatar = async ({ id }) => {
	try {
		const hit = await cache.get(AVATAR_CACHE, `avatar_${id}`);
		if (hit) {
			return hit;
		}

		const response = await run(db =>
			db.collection(AVATAR_COLLECTION).findOne({ id })
		);

		if (response) {
			await cache.set(AVATAR_CACHE, `avatar_${id}`, response.image);

			return response.image;
		}

		return null;
	} catch (e) {
		return null;
	}
};
