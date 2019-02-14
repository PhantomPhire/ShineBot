import {Command, CommandoClient, CommandMessage} from "discord.js-commando";
import {Message} from "discord.js";
import {GuildAudioPlayer} from "../../../DiscordBotUtils";

class Stop extends Command {
    constructor(client: CommandoClient) {
        super(client, {
            name: "stop",
            group: "sounds",
            memberName: "stop",
            description: "Stops playback of all sound and exits VoiceChannel."
        });
    }

    hasPermission(msg: CommandMessage): boolean {
        if (!msg.guild) {
            return false;
        }
        return msg.member.hasPermission("ADMINISTRATOR");
    }

    async run(msg: CommandMessage, args: string, fromPattern: boolean): Promise<Message | Message[] | void> {
        GuildAudioPlayer.getGuildAudioPlayer(msg.guild.id).stop();
    }
}
module.exports = Stop;