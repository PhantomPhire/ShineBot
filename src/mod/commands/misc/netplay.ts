import {Command, CommandoClient, CommandMessage} from "discord.js-commando";
import {Message} from "discord.js";
import getGuild = require("../../guild");

const netplayId = "312278623887294484";

export class Netplay extends Command {
    constructor(client: CommandoClient) {
        super(client, {
            name: "netplay",
            group: "misc",
            memberName: "netplay",
            aliases: ["np"],
            description: "Allows you to add or remove yourself from the netplay role.\n"
                + "Use parameters \"on\" or \"off\", using no parameters will toggle."
        });
    }

    async run(msg: CommandMessage, args: string, fromPattern: boolean): Promise<Message | Message[] | void> {
        let guild = getGuild.getGuild();
        args = args.toLowerCase().trim();
        guild!.fetchMember(msg.author)
        .then((member) => {
            var hasRole;
            if(member.roles.get(netplayId) != undefined) {
                hasRole = true;
            }
            else {
                hasRole = false;
            }


            if(args === "on") {
                if(!hasRole) {
                    member.addRole(netplayId);
                    msg.reply("Netplay role added.", {});
                }
            }
            else if(args === "off" && hasRole) {
                if(hasRole) {
                    member.removeRole(netplayId);
                    msg.reply("Netplay role removed.", {});
                }
            }
            else {
                if(hasRole) {
                    member.removeRole(netplayId);
                    msg.reply("Netplay role removed.", {});
                }
                else {
                    member.addRole(netplayId);
                    msg.reply("Netplay role added.", {});
                }
            }
        });
    }
}
module.exports = Netplay;