import {Command, CommandoClient, CommandMessage} from "discord.js-commando";
import {GuildMember, Message} from "discord.js";
import regionManager = require("../../region");
import getGuild = require("../../guild");

export class SetRegion extends Command {
    constructor(client: CommandoClient) {
        super(client, {
            name: "setregion",
            group: "region",
            memberName: "setregion",
            aliases: ["sr"],
            description: "Allows you to set your region in Oklahoma. For a list of choices, use the getregion command."
        });
    }

    async run(msg: CommandMessage, args: string, fromPattern: boolean): Promise<Message | Message[] | void> {
        var userArgs = args.split(" ");

        var region = userArgs[0];

        if(region === undefined) {
            return msg.reply("Please provide a region as a parameter.", {});
        }
        else
            region = region.toLowerCase();

        if(!regionManager.isRegion(region)) {
            return msg.reply(region + " is not a valid region", {});
        }

        var guild = undefined;

        if(msg.guild == null) {
            guild = getGuild.getGuild();
        }
        else {
            guild = msg.guild;
        }

        var roleToSet = regionManager.getRole(region);
        guild!.fetchMember(msg.author)
        .then((member) => {
            var roles = member.roles.filterArray(r => (regionManager.isRegion(r.name.toLowerCase()) || r.name === "Regionless"));

            for(let i = 0; i < roles.length; i++) {
                member.removeRole(roles[i].id)
                .catch(console.log);
            }

            member.addRole(roleToSet.id)
            .then((member: GuildMember) => msg.reply("your region is now set to " + roleToSet.name + ".", {}).catch(console.log));
        });
    }
}
module.exports = SetRegion;