import { Event } from "../structures/Event";
import { client } from "..";
import { env } from "process";
import { Message, Permissions } from "discord.js";

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

    let cooldown = client.cooldowns.get(`${command.name}-${message.member.user.username}`);
    

    if (command.cooldown && cooldown) {
        if (Date.now() < cooldown) {
            message.channel.send(`You have to wait ${Math.floor(Math.abs(Date.now() - cooldown) / 1000)} second(s) to use this command again.`)
            return
        }
        client.cooldowns.set(`${command.name}-${message.member.user.username}`, Date.now() + command.cooldown * 1000)
        setTimeout(() => {
            client.cooldowns.delete(`${command?.name}-${message.member?.user.username}`)
        }, command.cooldown * 1000)
    } else if (command.cooldown && !cooldown) {
        client.cooldowns.set(`${command.name}-${message.member.user.username}`, Date.now() + command.cooldown * 1000)
    }

    if (!message.member.permissions.has(Permissions.resolve(command.permissions))) {
        message.channel.send("sorry but you haven't premmision to use this command")
        return;
    }

    if (!command) return;

    await command.run({
        client: client,
        message: message as Message,
        args: args
    });
    
});
