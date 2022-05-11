import http from "http";
import { Server, Socket, BroadcastOperator } from "socket.io";
import { get, each } from "lodash";
import debugFunc from "debug";
import socketEvents from "./events";

const debug = debugFunc("app:socket");

export const eventTypes = Object.keys(socketEvents).reduce((acc, key) => {
	const methods = Object.keys(socketEvents[key]).reduce((acc2, key2) => ({
		...acc2,
		[key2]: `${key}/${key2}`
	}), {});

	return {
		...acc,
		[key]: methods
	};
}, {});

const bindEvents = (io, socket) => {
	each(eventTypes, (group) => {
		each(group, (action) => {
			const method = get(socketEvents, action.replace("/", "."), null);

			socket.on(action, (data, callback) => {
				debug(`Action triggered: ${action}`);

				return method({ socket, data, callback, io });
			});
			debug(`Bound socket.io event: ${action}`);
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
