import { CommandType, Command as normalCommand } from "../typings/Command";

export class slashCommand {
    constructor(commandOptions: CommandType) {
        Object.assign(this, commandOptions);
    }
}

export class Command {
    constructor (commandOptions: normalCommand) {
        Object.assign(this, commandOptions)
    }
}