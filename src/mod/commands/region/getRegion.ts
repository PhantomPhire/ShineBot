import {Command, CommandoClient, CommandMessage} from "discord.js-commando";
import {Message} from "discord.js";
import regionManager = require("../../region");

export class GetRegion extends Command {
    constructor(client: CommandoClient) {
        super(client, {
            name: "getregion",
            group: "region",
            memberName: "getregion",
            aliases: ["gr"],
            description: "Prints out a list of valid regions."
        });
    }


    async run(msg: CommandMessage, args: string, fromPattern: boolean): Promise<Message | Message[] | void> {
        let regions = regionManager.getRegionList();
        let regionPrint = "";

        for(let i = 0; i < regions.length; i++) {
            regionPrint += "\n" + regions[i];
        }

        msg.say("Here is the list of valid regions:" + regionPrint, {});
    }
}
module.exports = GetRegion;