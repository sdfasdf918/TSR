import { Event } from "../structures/Event";
import { client } from "..";
import { env } from "process";
import { Message } from "discord.js";

export default new Event("messageCreate",async (message) => {
    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(env.PREFIX)
    )
        return;

    const [cmd, ...args] = message.content
        .slice(env.PREFIX.length)
        .trim()
        .split(/ +/g);

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) return;
    await command.run({
        client: client,
        message: message as Message,
        args: args
    });
});
