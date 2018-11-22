import {Command, CommandoClient, CommandMessage} from "discord.js-commando";
import {Message} from "discord.js";
import {ServedGuild} from "../../voice";
import util = require("../../voice/soundUtil");

class Join extends Command {
    constructor(client: CommandoClient) {
        super(client, {
            name: "join",
            group: "sounds",
            memberName: "join",
            description: "Forces bot to join a channel"
        });
    }

    hasPermission(msg: CommandMessage): boolean {
        if (!msg.guild)
            return false;
		return msg.member.hasPermission("ADMINISTRATOR");
	}

    async run(msg: CommandMessage, args: string, fromPattern: boolean): Promise<Message | Message[] | void> {
        let userArgs: string[] | undefined = args.split(" ");

        let voiceChannel = util.findChannel(msg, userArgs);
        if (voiceChannel === undefined) {
            return msg.say("Error: No valid voice channel found");
        }

        ServedGuild.GetServerdGuild(msg.client, msg.guild.id).Join(voiceChannel);
    }
}
module.exports = Join;