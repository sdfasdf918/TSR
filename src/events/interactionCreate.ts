import { CommandInteractionOptionResolver, Permissions } from "discord.js";
import { client } from "..";
import { Event } from "../structures/Event";
import { ExtendedInteraction } from "../typings/Command";

export default new Event("interactionCreate", async (interaction) => {
    // Chat Input Commands
    if (interaction.isCommand()) {
        await interaction.deferReply();
        const command = client.commands_slash.get(interaction.commandName);

        let cooldown = client.cooldowns.get(`${command.name}-${interaction.member.user.username}`);
    
        if (interaction.memberPermissions.has(Permissions.resolve(command.userPermissions))) {
            interaction.reply("sorry but you haven't premmision to use this command")
            return;
        }

        if (command.cooldown && cooldown) {
            if (Date.now() < cooldown) {
                interaction.reply(`You have to wait ${Math.floor(Math.abs(Date.now() - cooldown) / 1000)} second(s) to use this command again.`)
                return
            }
            client.cooldowns.set(`${command.name}-${interaction.member.user.username}`, Date.now() + command.cooldown * 1000)
            setTimeout(() => {
                client.cooldowns.delete(`${command?.name}-${interaction.member?.user.username}`)
            }, command.cooldown * 1000)
        } else if (command.cooldown && !cooldown) {
            client.cooldowns.set(`${command.name}-${interaction.member.user.username}`, Date.now() + command.cooldown * 1000)
        }

        if (!command) return interaction.followUp("You have used a non existent command");
            
        command.run({
            args: interaction.options as CommandInteractionOptionResolver,
            client,
            interaction: interaction as ExtendedInteraction
        });
    }
});
