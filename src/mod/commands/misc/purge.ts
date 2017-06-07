import {Command, CommandoClient, CommandMessage} from "discord.js-commando";
import {Collection, Message, TextChannel} from "discord.js";

export class Purge extends Command {
    constructor(client: CommandoClient) {
        super(client, {
            name: "purge",
            group: "misc",
            memberName: "purge",
            description: "Deletes a specified number of preceding messages. Argument specifies number."
        });
    }

    hasPermission(msg: CommandMessage): boolean {
		if(!msg.guild) 
            return false;
		return msg.member.hasPermission("ADMINISTRATOR");
	}

    async run(msg: CommandMessage, args: string, fromPattern: boolean): Promise<Message | Message[] | void> {
        try {
            let msgNumber = parseInt(args);
            let channel = msg.channel as TextChannel;

            channel.fetchMessages({ limit: msgNumber, before: msg.id })
            .then( (messages: Collection<string, Message>) => {
                messages.forEach( (value, key, map) => { if(value.deletable) value.delete(); });
                msg.delete();
            });        
        }
        catch(e) {
            console.log(e);
            return msg.say("Please format your arguments correctly.", {})
        }
    }
}
module.exports = Purge;