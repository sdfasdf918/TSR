import { Command } from "../../structures/Command";

export default new Command({
    name: "ping",
    aliases: [],
    cooldown: 10,
    permissions: [],
    description: "see ping client",
    run: async ({ client, message, args }) => {
        message.channel.send(`Pong! (${client.ws.ping}ms)`)
    },
});
