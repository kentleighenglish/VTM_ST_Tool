import * as cache from "../cache";

export const clearCache = async ({ data: { name } }) => {
	await cache.clear(name);
}
