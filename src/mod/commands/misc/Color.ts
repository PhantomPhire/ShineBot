import {Command, CommandoClient, CommandMessage} from "discord.js-commando";
import {Collection, Guild, Message, TextChannel} from "discord.js";
import getGuild = require("../../guild");

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
        let guild: Guild | undefined = msg.guild;
        if (msg.guild == null)
            guild = getGuild.getGuild();
        return guild!.member(msg.author).roles.has(guild!.roles.find("name", "Power Ranked").id);
    }

    async run(msg: CommandMessage, args: string, fromPattern: boolean): Promise<Message | Message[] | void> {
        try {
            let guild: Guild | undefined = msg.guild;
            if (msg.guild == null)
                guild = getGuild.getGuild();
            for (let i = 1; i <= 10; i++) {
                let role = guild!.roles.find("name", "PR #" + i);
                if (role != null && guild!.member(msg.author).roles.has(role.id)) {
                    guild!.roles.get(role.id)!.setColor(args);
                    return;
                }
            }
        }
        catch (e) {
            console.log(e);
            return msg.say("Please format your arguments correctly.\nExample: Shine Color #94FF23", {});
        }
    }
}
module.exports = Color;