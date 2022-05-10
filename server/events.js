import * as m from "./mongo";

export const createSheet = async ({ socket, callback, data = {} }) => {
	callback({ name: "newSet" });
}

export const updateSheet = async () => {

}

export const loadSheet = async ({ callback }) => {
	callback({ name: "newSet" });
}
