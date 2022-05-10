import http from "http";
import { Server, Socket, BroadcastOperator } from "socket.io";
import { each } from "lodash";
import debugFunc from "debug";
import * as m from "./mongo";
import * as socketEvents from "./events";

const debug = debugFunc("app:socket");

const bindEvents = (io, socket) => {
	each(socketEvents, (func, action) => {
		socket.on(action, (data, callback) => {
			debug(`Event Trigger: ${action}`);

			return func({ socket, data, callback, io });
		});
	});
};

export default function (options) {
	this.nuxt.hook("render:before", () => {
		const server = http.createServer(this.nuxt.renderer.app);

		const io = new Server( server, { path: options.socketPath });

		this.nuxt.server.listen = (port, host) =>
			new Promise((resolve) =>
				server.listen(port || 3000, host || "localhost", resolve)
			);

		this.nuxt.hook("close", () => new Promise((resolve) => {
			server.close(resolve);
		}));

		io.on("connection", async (socket) => {
			debug("Socket connection");

			const {
				query: { platform = "", userAgent = "" },
			} = socket.handshake;

			socket.join("global");

			bindEvents(io, socket);
		});
	});
}
