import path from "path";

const server = {
	entry: "./index.js",
	output: {
		"path": path.resolve("./build"),
		"filename": "server.js"
	},
	target: "node",
	mode: process.env.NODE_ENV !== "development" ? "production" : "development"
}

const client = {
	entry: path.resolve("./src/root"),
	output: {
		"path": path.resolve("./public"),
		"filename": "app.js"
	},
	target: "web",
	mode: process.env.NODE_ENV !== "development" ? "production" : "development"
}

export default [server, client];