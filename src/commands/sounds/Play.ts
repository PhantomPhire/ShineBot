import {Command, CommandoClient, CommandMessage} from "discord.js-commando";
import {Message} from "discord.js";
import {GuildAudioPlayer} from "../../../DiscordBotUtils";

class Play extends Command {
    constructor(client: CommandoClient) {
        super(client, {
            name: "play",
            group: "sounds",
            memberName: "play",
            description: "Play the current playlist"
        });
    }

    hasPermission(msg: CommandMessage): boolean {
        if (!msg.guild) {
            return false;
        }
        return msg.member.hasPermission("ADMINISTRATOR");
    }

    async run(msg: CommandMessage, args: string, fromPattern: boolean): Promise<Message | Message[] | void> {
        GuildAudioPlayer.getGuildAudioPlayer(msg.guild.id).play();
    }
}
module.exports = Play;