import * as cache from "../cache";

export const clearCache = async ({ data: { cacheName, key } }) => {
	await cache.del(cacheName, name);
}
