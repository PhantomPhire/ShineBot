import {Command, CommandoClient, CommandMessage} from "discord.js-commando";
import {Message} from "discord.js";
import {GuildAudioPlayer} from "../../../DiscordBotUtils/src/voice/GuildAudioPlayer";

class Playlist extends Command {
    constructor(client: CommandoClient) {
        super(client, {
            name: "playlist",
            group: "sounds",
            memberName: "playlist",
            description: "Displays the current playlist."
        });
    }

    hasPermission(msg: CommandMessage): boolean {
        if (!msg.guild) {
            return false;
        }
        return msg.member.hasPermission("ADMINISTRATOR");
    }

    async run(msg: CommandMessage, args: string, fromPattern: boolean): Promise<Message | Message[] | void> {
        return msg.say(GuildAudioPlayer.getGuildAudioPlayer(msg.guild.id).getQueueListing(), {});
    }
}
module.exports = Playlist;