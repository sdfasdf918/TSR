import { EmbedBuilder } from "discord.js";
import { env } from "process";
import { Command } from "../../structures/Command";

export default new Command({
    name: "role-add",
    aliases: [],
    cooldown: 10,
    permissions: ["ManageRoles"],
    description: "role add",
    useAge: "<Mention> <roleMention>",
    run: async ({ client, message, args }) => {
        const Mention = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const role = message.mentions.roles.last() || message.guild.roles.cache.get(args[0]);

        if (!Mention) {
            message.channel.send({
                embeds: [
                    new EmbedBuilder()
                    .setColor("Red")
                    .setTitle("role")
                    .setDescription(`${env.PREFIX}role-add <Mention> <role> <reason>`)
                ],
            })
            return;
        }

        if (!role) {
            message.channel.send({
                embeds: [
                    new EmbedBuilder()
                    .setColor("Red")
                    .setTitle("role")
                    .setDescription(`${env.PREFIX}role-add <Mention> <role> <reason>`)
                ],
            })
            return;
        }
        
        if (!args[2]) {
            args[2] = "No Reason";
        }

        Mention.roles.add(role, args[2]).then(() => {
            message.channel.send({
                embeds: [
                    new EmbedBuilder()
                    .setDescription(`✅ Changed roles for ${Mention.user.username}, **${role.name}**`)
                ]
            })
        })
    },
});
