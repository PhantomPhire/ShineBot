import {Command, CommandoClient, CommandMessage} from "discord.js-commando";
import {Message} from "discord.js";
import {ServedGuild, VoiceMode} from "../../voice";

class Leave extends Command {
    constructor(client: CommandoClient) {
        super(client, {
            name: "leave",
            group: "sounds",
            memberName: "leave",
            description: "Forces bot to leave current voice channel"
        });
    }

    hasPermission(msg: CommandMessage): boolean {
        if (!msg.guild)
            return false;
		return msg.member.hasPermission("ADMINISTRATOR");
	}

    async run(msg: CommandMessage, args: string, fromPattern: boolean): Promise<Message | Message[] | void> {
        ServedGuild.GetServerdGuild(msg.client, msg.guild.id).Leave();
    }
}
module.exports = Leave;