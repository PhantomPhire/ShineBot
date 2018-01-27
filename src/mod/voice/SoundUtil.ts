import {VoiceChannel} from "discord.js";
import {CommandMessage} from "discord.js-commando";
import guildFind = require("../utilities/guildFind");

export function findChannel(msg: CommandMessage, args?: string[]): VoiceChannel | undefined {
    if(msg.channel.type !== "text")
        return undefined;

    if (args != undefined) {
        if (msg.mentions.users.first() != undefined) {
            msg.mentions.members.forEach((value, key, map) => {
                if (value.voiceChannel != null)
                    return value.voiceChannel;
            });
        }

        for (let i = 0; i < args.length; i++) {
            let chan = guildFind.findVoiceChannelPartial(args[i], msg.guild);
            if (chan != undefined)
                return chan;

            let mem = guildFind.findMemberNamePartial(args[i], msg.guild);
            if (mem != undefined)
                if (mem.voiceChannel != undefined)
                    return mem!.voiceChannel;
        }
    }

    return msg.member.voiceChannel;
}