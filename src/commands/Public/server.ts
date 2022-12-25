import { ChannelType, EmbedBuilder, GuildMember } from "discord.js";
import { Command } from "../../structures/Command";

export default new Command({
    name: "server",
    aliases: [],
    cooldown: 10,
    permissions: [],
    description: "show server info",
    run: async ({ client, message, args }) => {
        message.channel.send({
            embeds: [
                new EmbedBuilder()
                .setAuthor({ iconURL: message.guild.iconURL(), name: message.guild.name })
                .setThumbnail(message.guild.iconURL())
                .setFields(
                    {
                        name: `🆔 **Server ID**`, value: `${message.guild.id}`, inline: true
                    },
                    {
                        name: `📅 Created On`, value: `\`${message.guild.createdAt.toDateString()}\``, inline: true
                    },
                    {
                        name: `👑 Owned by`, value: `<@${message.guild.ownerId}>`, inline: true
                    },
                    {
                        name: `👥  Members (${message.guild.memberCount})`, value: `
                        ${message.guild.members.cache.filter(member => member.premiumSinceTimestamp).size} boosts ✨
                        `, inline: true
                    },
                    {
                        name: `💬 Channels (${message.guild.channels.cache.filter(ch => ch.type !== ChannelType.GuildCategory).size})`, value: `
                        **${message.guild.channels.cache.filter(ch => ch.type === ChannelType.GuildText).size}** text | **${message.guild.channels.cache.filter(ch => ch.type === ChannelType.GuildVoice).size}** voice
                        `, inline: true
                    },
                    {
                        name: `Roles(${message.guild.roles.cache.filter(ro => ro).size})`, value: `To see a list with all roles use **!roles**`, inline: true
                    }
                )
            ]
        })
    },
});
