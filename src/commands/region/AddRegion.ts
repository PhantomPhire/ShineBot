import {Command, CommandoClient, CommandMessage} from "discord.js-commando";
import {Message} from "discord.js";
import {RegionManager} from "../../utility/RegionManager";
import fs = require("fs");

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
        if (!msg.guild)
            return msg.author.id === this.client.options.owner;
        return msg.member.hasPermission("ADMINISTRATOR");
    }

    async run(msg: CommandMessage, args: string, fromPattern: boolean): Promise<Message | Message[] | void> {
        fs.appendFile(__dirname + "/regions.txt", ",\r\n" + args, (err) => {
            if (err)
                throw err;
            else
                RegionManager.initialize();
        });

        return msg.say("Region added", {});
    }
}
module.exports = AddRegion;
