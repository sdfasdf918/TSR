import { EmbedBuilder } from "discord.js";
import { Command } from "../../structures/Command";

export default new Command({
    name: "avatar",
    aliases: [],
    cooldown: 10,
    permissions: ["SendMessages"],
    description: "avatar user",
    useAge: "<Mention?>",
    run: async ({ client, message, args }) => {
        const user = message.mentions.users.first() || 
        message.author;

        message.channel.send({
            embeds: [
                new EmbedBuilder()
                .setTitle("Avatar Link")
                .setURL(user.avatarURL({ size: 1024 }))
                .setAuthor({ iconURL: user.avatarURL(), name: user.username })
                .setImage(user.avatarURL({ size: 1024 }))
                .setFooter({
                    iconURL: message.author.avatarURL(),
                    text: `Requested by ${message.author.username}`
                })
            ]
        })
    },
});
