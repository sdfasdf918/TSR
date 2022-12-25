import { EmbedBuilder } from "discord.js";
import { env } from "process";
import { Command } from "../../structures/Command";

export default new Command({
    name: "kick",
    aliases: [],
    cooldown: 10,
    permissions: ["KickMembers"],
    description: "Kick member for reason",
    useAge: "<Mention> <Reason?>",
    run: async ({ client, message, args }) => {
        
        const Mention = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!Mention) {
            message.channel.send({
                embeds: [
                    new EmbedBuilder()
                    .setColor("Red")
                    .setTitle("Kick")
                    .setDescription(`${env.PREFIX}Kick <Mention> <Reason>`)
                ],
            })
            return;
        }

        if (!args[1]) args[1] = "No Reason";

        if (Mention.id === message.author.id) {
            message.channel.send({
                embeds: [
                    new EmbedBuilder()
                    .setColor("Red")
                    .setTitle("ERROR")
                    .setDescription(`🙄 -  You can't Kick ${Mention.user.tag}. `)
                ]
            })
            return;
        }

        if (Mention.id === message.guild.ownerId) {
            message.channel.send({
                embeds: [
                    new EmbedBuilder()
                    .setColor("Red")
                    .setTitle("ERROR")
                    .setDescription(`🙄 -  You can't Kick ${Mention.user.tag}. `)
                ]
            })
            return;
        }
        
        Mention.kick(args[1]).then((user) => {
            message.channel.send({
                embeds: [
                    new EmbedBuilder()
                    .setTitle("Kick")
                    .setColor("Blue")
                    .setThumbnail(user.avatarURL())
                    .setFields(
                        {
                            name: "User", value: `**${Mention.user.username}**`
                        },
                        {
                            name: "Reason", value: `**${args[1]}**`
                        }
                    )
                    .setDescription(`:white_check_mark: ${Mention.user.username} Kicked from the server!`)
                    .setTimestamp()
                ]
            })
        })
    },
});
