import { Commands } from "../../structures/Command";

export default new Commands({
    name: "ping",
    aliases: ["f"],
    cooldown: 10000,
    permissions: [],
    description: "see ping client",
    run: async ({ client, message, args }) => {
        message.channel.send(`Pong! (${client.ws.ping}ms)`)
    },
});
