import {Command, CommandoClient, CommandMessage} from "discord.js-commando";
import {GuildMember, Message, Role} from "discord.js";
import meleeManager = require("./mainManager");
import getGuild = require("../../guild");

export class SetMain extends Command {
    constructor(client: CommandoClient) {
        super(client, {
            name: "setmain",
            group: "melee",
            memberName: "setmain",
            aliases: ["sm", "main", "character"],
            description: "Allows you to set your Melee main. Multiple mains are allowed. To get a list of mains, "
                + "use the \"mains\" command"
        });
    }

    async run(msg: CommandMessage, args: string, fromPattern: boolean): Promise<Message | Message[] | void> {
        let character = args.trim();

        if (character === undefined) {
            return msg.reply("Please provide a Melee character as a parameter.");
        }
        else
            character = character.toLowerCase();

        if (!meleeManager.isMain(character)) {
            return msg.reply(character + " is not a valid Melee character");
        }

        let guild = undefined;

        if (msg.guild == null) {
            guild = getGuild.getGuild();
        }
        else {
            guild = msg.guild;
        }

        let roleToSet = guild!.roles.find((r) => r.name.toLowerCase() === character);
        guild!.fetchMember(msg.author)
        .then((member) => {
            let redundantRole = member.roles.get(roleToSet.id);

            if (redundantRole === undefined) {
                member.addRole(roleToSet.id)
                .then((member: GuildMember) => msg.reply("You are now maining " + roleToSet.name + ".").catch(console.error));
            }
            else {
                member.removeRole(redundantRole)
                .then((member: GuildMember) => msg.reply("You are no longer maining " + roleToSet.name + ".").catch(console.error))
                .catch(console.error);
            }
        });
    }
}
module.exports = SetMain;