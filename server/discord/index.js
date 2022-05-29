import { Client, Intents } from "discord.js";
import debugFunc from "../debug";

const debug = debugFunc("discord");

const botToken = process.env.DISCORD_BOT_TOKEN;
const channelId = process.env.DISCORD_BOT_CHANNEL;

const client = new Client({ intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });

client.on("ready", () => {
	debug("Discord bot is online");
});

export const login = () => {
	if (botToken) {
		client.login(botToken);
	}
};

const hexToDecimal = hex => parseInt(hex.replace(/#/g, ""), 16);

export const sendMessage = async (payload = {}) => {
	const channel = await client.channels.fetch(channelId);

	if (channel) {
		const embeds = (payload.embeds || []).map(e => ({
			...e,
			color: hexToDecimal("#FF0000")
		}));

		channel.send({ ...payload, embeds });
	}
}
