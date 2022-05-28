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

	const diceRollFields = [6, 5, 1, 10, 8, 7].reduce((acc, num) => ([
		...acc,
		`**${num}**`
	]), []);

	if (channel) {
		const exampleEmbed = {
			color: hexToDecimal("#FF0000"),
			title: "Character Name",
			// thumbnail: {
			// 	url: "https://i.imgur.com/AfFp7pu.png"
			// },
			description: diceRollFields.join(" + "),
			timestamp: new Date()
		};

		channel.send({ embeds: [exampleEmbed] });
	}
}
