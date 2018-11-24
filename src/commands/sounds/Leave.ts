import {Command, CommandoClient, CommandMessage} from "discord.js-commando";
import {Message} from "discord.js";
import {GuildAudioPlayer} from "../../../DiscordBotUtils/src/voice/GuildAudioPlayer";

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
        if (!msg.guild) {
            return false;
        }
        return msg.member.hasPermission("ADMINISTRATOR");
    }

    async run(msg: CommandMessage, args: string, fromPattern: boolean): Promise<Message | Message[] | void> {
        GuildAudioPlayer.getGuildAudioPlayer(msg.guild.id).leave();
    }
}
module.exports = Leave;