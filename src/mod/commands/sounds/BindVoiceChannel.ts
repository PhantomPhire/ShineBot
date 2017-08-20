import {Command, CommandoClient, CommandMessage} from "discord.js-commando";
import {Message} from "discord.js";
import {ServedGuild, VoiceMode} from "../../voice";
import util = require("../../voice/SoundUtil");

class BindChannel extends Command {
    constructor(client: CommandoClient) {
        super(client, {
            name: "bindchannel",
            group: "sounds",
            memberName: "bindchannel",
            aliases: ["bind"],
            description: "Sets bound voice channel to parameter"
        });
    }

    hasPermission(msg: CommandMessage): boolean {
        if (!msg.guild)
            return false;
		return msg.member.hasPermission("ADMINISTRATOR");
	}

    async run(msg: CommandMessage, args: string, fromPattern: boolean): Promise<Message | Message[] | void> {
        let userArgs: string[] | undefined = args.split(" ");

        let sGuild = ServedGuild.GetServerdGuild(msg.client, msg.guild.id);
        let voiceChannel = util.findChannel(msg, userArgs);
        if (voiceChannel === undefined) {
            return msg.say("Error: No valid voice channel found");
        }

        sGuild.BoundVoiceChannel = voiceChannel;
        return msg.say("Successfully bound to " + voiceChannel.toString());
    }
}
module.exports = BindChannel;