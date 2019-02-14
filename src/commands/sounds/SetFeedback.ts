import {Command, CommandoClient, CommandMessage} from "discord.js-commando";
import {Message, TextChannel} from "discord.js";
import {GuildAudioPlayer} from "../../../DiscordBotUtils";

class SetFeedback extends Command {
    constructor(client: CommandoClient) {
        super(client, {
            name: "setfeedback",
            group: "sounds",
            memberName: "setfeedback",
            aliases: ["feedback"],
            description: "Sets the current channel for bot sound feedback"
        });
    }

    hasPermission(msg: CommandMessage): boolean {
        if (!msg.guild) {
            return false;
        }
        return msg.member.hasPermission("ADMINISTRATOR");
    }

    async run(msg: CommandMessage, args: string, fromPattern: boolean): Promise<Message | Message[] | void> {
        GuildAudioPlayer.getGuildAudioPlayer(msg.guild.id).FeedbackChannel = msg.channel as TextChannel;
        msg.say(msg.channel + " set as new voice feedback channel");
    }
}
module.exports = SetFeedback;