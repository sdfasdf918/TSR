import { EmbedBuilder } from "@discordjs/builders";
import { Message } from "discord.js";
import { Command } from "../../structures/Command";
interface message extends Message {};
export default new Command({
    name: "reaction",
    aliases: [],
    cooldown: 10,
    permissions: ["ManageRoles", "Administrator"],
    description: "reaction roles",
    run: async ({ client, message, args }) => {
        let author = (e: { author: { id: string; }; }) => e.author.id === message.author.id;
        let emsg = message.channel.send({
            embeds: [
                new EmbedBuilder()
                .setDescription("pleas type your title ```js\n if you don't want pleas type ||no||```")
            ]
        })
        const collect = message.channel.createMessageCollector({ filter: author, time: 60*1000, max: 1 })
    },
});
