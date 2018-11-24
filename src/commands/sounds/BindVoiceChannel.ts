import {Command, CommandoClient, CommandMessage} from "discord.js-commando";
import {Message, VoiceChannel} from "discord.js";
import {GuildAudioPlayer} from "../../../DiscordBotUtils/src/voice/GuildAudioPlayer";
import {NameResolution} from "../../../DiscordBotUtils/src/NameResolution";

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

    public hasPermission(msg: CommandMessage): boolean {
        if (!msg.guild) {
            return false;
        }
        return msg.member.hasPermission("ADMINISTRATOR");
    }

    async run(msg: CommandMessage, args: string, fromPattern: boolean): Promise<Message | Message[] | void> {
        let userArgs: string[] | undefined = args.split(" ");

        let sGuild = GuildAudioPlayer.getGuildAudioPlayer(msg.guild.id);
        let voiceChannel: VoiceChannel | undefined = undefined;
        for (let i = 0; i < userArgs.length; i++) {
            voiceChannel = NameResolution.commandMessageToVoiceChannel(userArgs[i], msg, msg.guild);
            if (voiceChannel !== undefined) {
                break;
            }
        }

        if (voiceChannel === undefined) {
            return msg.say("Error: No valid voice channel found");
        }

        sGuild.BoundVoiceChannel = voiceChannel;
        return msg.say("Successfully bound to " + voiceChannel.toString());
    }
}
module.exports = BindChannel;