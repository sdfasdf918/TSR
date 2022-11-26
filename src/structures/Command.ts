import { CommandType, Commandf } from "../typings/Command";

export class Command {
    constructor(commandOptions: CommandType) {
        Object.assign(this, commandOptions);
    }
}

export class Commands {
    constructor (commandOptions: Commandf) {
        Object.assign(this, commandOptions)
    }
}