const NodeCache = require("node-cache");

const caches = {};

export const createCache = name => {
	caches[name] = new NodeCache();
}

export const getCache = name => {
	if (caches[name]) {
		return caches[name];
	}

	throw `Cache not found ${name}`;
}

export const get = (cacheName, key) => {
	return getCache(cacheName).get(key);
}

export const set = (cacheName, key, val) => {
	return getCache(cacheName).set(key, val);
}

export const del = (cacheName, key) => {
	return getCache(cacheName).del(key);
}
