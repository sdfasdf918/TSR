import { Command } from "../../structures/Command";

export default new Command({
    name: "setNickname",
    aliases: [],
    cooldown: 10,
    permissions: ["ManageNicknames"],
    description: "see ping client",
    useAge: "<Mention?> <Reason?>",
    run: async ({ client, message, args }) => {
        const Mention = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;

        if (!args[2]) {
            args[2] = "No Reason";
        }

        message.guild.members.cache.get(Mention.id).setNickname(args[1], args[2]);
    },
});
