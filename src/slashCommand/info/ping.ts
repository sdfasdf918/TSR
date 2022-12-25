import { slashCommand } from "../../structures/Command";

export default new slashCommand({
    name: "ping",
    description: "replies with pong.",
    userPermissions: ["Administrator"],
    run: async ({ interaction }) => {
        interaction.followUp("Pong3");
    },
});
