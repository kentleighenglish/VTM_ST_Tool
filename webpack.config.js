import { merge } from "webpack-merge";
import path from "path";

const base = {
	mode: process.env.NODE_ENV !== "development" ? "production" : "development"
}

const server = merge(base, {
	entry: "./index.js",
	output: {
		"path": path.resolve("./build"),
		"filename": "server.js"
	},
	target: "node"
})

const client = merge(base, {
	entry: path.resolve("./src/root"),
	output: {
		"path": path.resolve("./public"),
		"filename": "app.js"
	},
	target: "web",
	devtool: "hidden-source-map"
})

export default [server, client];