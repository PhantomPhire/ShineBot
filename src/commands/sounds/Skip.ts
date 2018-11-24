import {Command, CommandoClient, CommandMessage} from "discord.js-commando";
import {Message} from "discord.js";
import {GuildAudioPlayer} from "../../../DiscordBotUtils/src/voice/GuildAudioPlayer";

class Skip extends Command {
    constructor(client: CommandoClient) {
        super(client, {
            name: "skip",
            group: "sounds",
            memberName: "skip",
            description: "Skip current sound in queue."
        });
    }

    hasPermission(msg: CommandMessage): boolean {
        if (!msg.guild) {
            return false;
        }
        return msg.member.hasPermission("ADMINISTRATOR");
    }

    async run(msg: CommandMessage, args: string, fromPattern: boolean): Promise<Message | Message[] | void> {
        GuildAudioPlayer.getGuildAudioPlayer(msg.guild.id).skip();
    }
}
module.exports = Skip;