import { EmbedBuilder } from "discord.js";
import { env } from "process";
import { Command } from "../../structures/Command";

export default new Command({
    name: "ban",
    aliases: [],
    cooldown: 10,
    permissions: ["BanMembers"],
    description: "ban member for reason",
    useAge: `<Mention> <Reason?>`,
    run: async ({ client, message, args }) => {
        
        const Mention = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!Mention) {
            message.channel.send({
                embeds: [
                    new EmbedBuilder()
                    .setColor("Red")
                    .setTitle("Ban")
                    .setDescription(`${env.PREFIX}ban <Mention> <Reason>`)
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
                    .setDescription(`🙄 -  You can't ban ${Mention.user.tag}. `)
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
                    .setDescription(`🙄 -  You can't ban ${Mention.user.tag}. `)
                ]
            })
            return;
        }
        
        Mention.ban({ reason: args[1] }).then((user) => {
            message.channel.send({
                embeds: [
                    new EmbedBuilder()
                    .setTitle("Ban")
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
                    .setDescription(`:white_check_mark: ${Mention.user.username} banned from the server! :airplane:`)
                    .setTimestamp()
                ]
            })
        })
    },
});
