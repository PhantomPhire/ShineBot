import {Command, CommandoClient, CommandMessage} from "discord.js-commando";
import {GuildMember, Message} from "discord.js";
import {OklahomaMeleeDiscord} from "../../OklahomaMeleeDiscord";
import {ShineBotConstants} from "../../Constants";

export class Legacy extends Command {
    constructor(client: CommandoClient) {
        super(client, {
            name: "legacy",
            group: "misc",
            memberName: "legacy",
            description: "Allows you to add or remove yourself from the legacy role.\n"
                + "Use parameters \"on\" or \"off\", using no parameters will toggle."
        });
    }

    async run(msg: CommandMessage, args: string, fromPattern: boolean): Promise<Message | Message[] | void> {
        let guild = OklahomaMeleeDiscord.getGuild();
        args = args.toLowerCase().trim();
        guild!.fetchMember(msg.author)
        .then((member: GuildMember) => {
            let hasRole = member.roles.has(ShineBotConstants.legacyRole);

            if (args === "on") {
                if (!hasRole) {
                    this.addLegacy(member, msg);
                }
                else {
                    msg.reply("Legacy role is already set.", {});
                }
            }
            else if (args === "off") {
                if (hasRole) {
                    this.removeLegacy(member, msg);
                }
                else {
                    msg.reply("Legacy role is already unset.", {});
                }
            }
            else {
                if (!hasRole) {
                    this.addLegacy(member, msg);
                }
                else {
                    this.removeLegacy(member, msg);
                }
            }
        });
    }

    private addLegacy(member: GuildMember, msg: CommandMessage): void {
        member.addRole(ShineBotConstants.legacyRole);
        msg.reply("Legacy role added.");
    }

    private removeLegacy(member: GuildMember, msg: CommandMessage): void {
        member.removeRole(ShineBotConstants.legacyRole);
        msg.reply("Legacy role removed.");
    }
}
module.exports = Legacy;