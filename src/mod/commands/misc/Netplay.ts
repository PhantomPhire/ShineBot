import {Command, CommandoClient, CommandMessage} from "discord.js-commando";
import {GuildMember, Message} from "discord.js";
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
            let hasRole = member.roles.has(netplayId);

            if (args === "on") {
                if (!hasRole) {
                    this.addNetplay(member, msg);
                }
                else {
                    msg.reply("Netplay role is already set.", {});
                }
            }
            else if (args === "off") {
                if (hasRole) {
                    this.removeNetplay(member, msg);
                }
                else {
                    msg.reply("Netplay role is already unset.", {});
                }
            }
            else {
                if (hasRole) {
                    this.addNetplay(member, msg);
                }
                else {
                    this.removeNetplay(member, msg);
                }
            }
        });
    }

    private addNetplay(member: GuildMember, msg: CommandMessage): void {
        member.addRole(netplayId);
        msg.reply("Netplay role added.", {});
    }

    private removeNetplay(member: GuildMember, msg: CommandMessage): void {
        member.removeRole(netplayId);
        msg.reply("Netplay role removed.", {});
    }
}
module.exports = Netplay;