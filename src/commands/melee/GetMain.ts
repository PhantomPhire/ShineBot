import {Command, CommandoClient, CommandMessage} from "discord.js-commando";
import {Message} from "discord.js";
import {MainManager} from "../../utility/MainManager";

export class GetMain extends Command {
    constructor(client: CommandoClient) {
        super(client, {
            name: "getmain",
            group: "melee",
            memberName: "getmain",
            aliases: ["getmains", "mains"],
            description: "Prints out a list of valid Melee mains that can be used on the Oklahoma Melee Discord Server."
        });
    }

    async run(msg: CommandMessage, args: string, fromPattern: boolean): Promise<Message | Message[] | void> {
        let mains = MainManager.mains;
        let mainPrint = "";

        for (let i = 0; i < mains.length; i++) {
            mainPrint += "\n" + mains[i];
        }

        msg.say("Here is the list of valid mains:" + mainPrint, {});
    }
}
module.exports = GetMain;