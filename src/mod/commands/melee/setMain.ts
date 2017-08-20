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
        let character = meleeManager.formatString(args).trim();

        if (character === undefined || character === "") {
            return msg.reply("please provide a Melee character as a parameter.");
        }

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

        let possibleRoles = guild!.roles.filterArray( (r: Role) => (meleeManager.formatString(r.name) === character && meleeManager.isMain(r.name)));

        if (possibleRoles.length < 1)
            possibleRoles = guild!.roles.filterArray( (r: Role) => (meleeManager.formatString(r.name).includes(character) && meleeManager.isMain(r.name)));

        if (possibleRoles.length > 1) {
            return msg.say("Ambiguous input");
        }

        let roleToSet = possibleRoles[0];
        guild!.fetchMember(msg.author)
        .then((member) => {
            let redundantRole = member.roles.get(roleToSet.id);

            if (redundantRole === undefined) {
                member.addRole(roleToSet.id)
                .then((member: GuildMember) => msg.reply("you are now maining " + roleToSet.name + ".").catch(console.error));
            }
            else {
                member.removeRole(redundantRole)
                .then((member: GuildMember) => msg.reply("you are no longer maining " + roleToSet.name + ".").catch(console.error))
                .catch(console.error);
            }
        });
    }
}
module.exports = SetMain;