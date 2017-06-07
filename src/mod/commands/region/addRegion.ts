import {Command, CommandoClient, CommandMessage} from "discord.js-commando";
import {Message} from "discord.js";
import fs = require("fs");
import regionManager = require("../../region");

export class AddRegion extends Command {
    constructor(client: CommandoClient) {
        super(client, {
            name: "addregion",
            group: "region",
            memberName: "addregion",
            description: "Adds a region and appends it to the region file."
        });
    }

    hasPermission(msg: CommandMessage): boolean {
		if(!msg.guild) 
            return msg.author.id === this.client.options.owner;
		return msg.member.hasPermission("ADMINISTRATOR");
	}

    async run(msg: CommandMessage, args: string, fromPattern: boolean): Promise<Message | Message[] | void> {
        fs.appendFile(__dirname + "/regions.txt", ",\r\n" + args, (err) => {
            if (err)
                throw err;
            else
                regionManager.readIn();
        });

        return msg.say("Region added", {});
    }
}
module.exports = AddRegion;
