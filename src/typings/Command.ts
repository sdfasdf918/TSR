import {
    ChatInputApplicationCommandData,
    CommandInteraction,
    CommandInteractionOptionResolver,
    GuildMember,
    PermissionResolvable,
    Message
} from "discord.js";
import { ExtendedClient } from "../structures/Client";

/**
 * {
 *  name: "commandname",
 * description: "any description",
 * run: async({ interaction }) => {
 *
 * }
 * }
 */
export interface ExtendedInteraction extends CommandInteraction {
    member: GuildMember;
}

interface RunOptions {
    client: ExtendedClient;
    interaction: ExtendedInteraction;
    args: CommandInteractionOptionResolver;
}

type RunFunction = (options: RunOptions) => any;

export type CommandType = {
    userPermissions?: PermissionResolvable[];
    run: RunFunction;
    cooldown?: number;
} & ChatInputApplicationCommandData;

interface RunFunctionCommand {
    client: ExtendedClient;
    message: Message;
    args: string[];
    cooldown?: number;
}

export type CommandsType = {
    userPermissions?: PermissionResolvable[];
    run: CommandRun;
} & ChatInputApplicationCommandData;


type CommandRun = (options: RunFunctionCommand) => any;

export interface Command extends ChatInputApplicationCommandData {
    name: string,
    permissions?: PermissionResolvable[],
    aliases: Array<string>,
    cooldown?: number,
    run: CommandRun;
}
export interface Commandf extends Command {

}