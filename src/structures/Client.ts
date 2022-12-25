import {
    ApplicationCommandDataResolvable,
    Client,
    ClientEvents,
    Collection
} from "discord.js";
import { CommandType, Command } from "../typings/Command";
import glob from "glob";
import { promisify } from "util";
import { RegisterCommandsOptions } from "../typings/client";
import { Event } from "./Event";
import Mongo from "./Moongo"

const globPromise = promisify(glob);

export class ExtendedClient extends Client {
    commands_slash: Collection<string, CommandType> = new Collection();
    commands: Collection<string, Command> = new Collection();
    cooldowns: Collection<string, number> = new Collection();

    constructor() {
        super({ intents: 32767 });
    }

    start() {
        this.registerModules();
        this.login(process.env.botToken);
    }
    async importFile(filePath: string) {
        return (await import(filePath))?.default;
    }

    async registerCommands({ commands, guildId }: RegisterCommandsOptions) {
        if (guildId) {
            this.guilds.cache.get(guildId)?.commands.set(commands);
            console.log(`Registering commands to ${guildId}`);
        } else {
            this.application?.commands.set(commands);
            console.log("Registering global commands");
        }
    }

    async registerModules() {
        // slashCommands
        const slashCommands: ApplicationCommandDataResolvable[] = [];
        const Commands = [];
        const commandFiles = await globPromise(
            `${__dirname}/../command/*/*{.ts,.js}`
        );
        commandFiles.forEach(async (filePath) => {
            const command: CommandType = await this.importFile(filePath);
            if (!command.name) return;
            console.log(command);

            this.commands_slash.set(command.name, command);
            slashCommands.push(command);
        });
        

        //commands
        const commandsFiles = await globPromise(
            `${__dirname}/../commands/*/*{.ts,.js}`
        );

        commandsFiles.forEach(async (filePath) => {
            const command: Command = await this.importFile(filePath);
            if (!command.name) return;
            console.log(command);

            this.commands.set(command.name, command);
            Commands.push(command);
        });

        this.on("ready", () => {
            this.registerCommands({
                commands: slashCommands,
                guildId: process.env.guildId
            });
        });

        // Event
        const eventFiles = await globPromise(
            `${__dirname}/../events/*{.ts,.js}`
        );
        eventFiles.forEach(async (filePath) => {
            const event: Event<keyof ClientEvents> = await this.importFile(
                filePath
            );
            this.on(event.event, event.run);
        });

        // mongo module
        Mongo({ MongoURL: process.env.MongoURL , NAME: process.env.NAME })

    }
}
