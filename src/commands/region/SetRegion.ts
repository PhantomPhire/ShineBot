import {Command, CommandoClient, CommandMessage} from "discord.js-commando";
import {GuildMember, Message, Role} from "discord.js";
import {RegionManager} from "../../utility/RegionManager";
import {OklahomaMeleeDiscord} from "../../OklahomaMeleeDiscord";

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
        let region = args.trim();

        if (region === undefined) {
            return msg.reply("Please provide a region as a parameter.", {});
        }
        else
            region = region.toLowerCase();

        if (!RegionManager.validateRegion(region)) {
            return msg.reply(region + " is not a valid region", {});
        }

        let guild = undefined;

        if (msg.guild == null) {
            guild = OklahomaMeleeDiscord.getGuild();
        }
        else {
            guild = msg.guild;
        }

        let roleToSet = guild!.roles.find( (r: Role) => r.name.toLowerCase() === region);
        guild!.fetchMember(msg.author)
        .then((member: GuildMember) => {
            let roles = member.roles.filterArray( (r: Role) => (RegionManager.validateRegion(r.name.toLowerCase()) || r.name === "Regionless"));

            for (let i = 0; i < roles.length; i++) {
                member.removeRole(roles[i].id)
                .catch(console.error);
            }

            member.addRole(roleToSet.id)
            .then((member: GuildMember) => msg.reply("your region is now set to " + roleToSet.name + ".", {}).catch(console.error));
        });
    }
}
module.exports = SetRegion;