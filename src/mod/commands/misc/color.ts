import {Command, CommandoClient, CommandMessage} from "discord.js-commando";
import {Collection, Message, TextChannel} from "discord.js";

export class Color extends Command {
    constructor(client: CommandoClient) {
        super(client, {
            name: "color",
            group: "misc",
            memberName: "color",
            description: "Changes the color of a PR member's role."
        });
    }

    hasPermission(msg: CommandMessage): boolean {
        if (!msg.guild)
            return false;
        //return msg.member.hasPermission("ADMINISTRATOR");
        return msg.member.roles.has(msg.guild.roles.find("name", "Power Ranked").id);
    }

    async run(msg: CommandMessage, args: string, fromPattern: boolean): Promise<Message | Message[] | void> {
        try {
            for(let i = 1; i <= 10; i++)
            {
                let role = msg.guild.roles.find("name", "PR #" + i)
                {
                    msg.guild.roles.get(role.id).setColor(args);
                    return;
                }
            }
        }
        catch (e) {
            console.log(e);
            return msg.say("Please format your arguments correctly.", {});
        }
    }
}
module.exports = Color;
