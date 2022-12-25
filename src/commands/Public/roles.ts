import { EmbedBuilder } from "@discordjs/builders";
import { Command } from "../../structures/Command";

export default new Command({
    name: "roles",
    aliases: [],
    cooldown: 10,
    permissions: [],
    description: "to show server roles",
    run: async ({ client, message, args }) => {
        let rolemap = message.guild.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(r => `${r.name} =>  ${r.members.size} Members`)
            .join("\n");
            if (rolemap.length > 1024) rolemap = "To many roles to display";
            if (!rolemap) rolemap = "No roles";
        message.channel.send({
            embeds: [
                new EmbedBuilder()
                .setDescription(rolemap)
                .setTimestamp()
                .setThumbnail(message.guild.iconURL())
            ]
        })
    },
});
