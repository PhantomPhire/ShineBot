const commando = require('discord.js-commando');
const getGuild = require(__dirname + '/../../utilities/getGuild.js');
const netplayId = "312278623887294484";

class netplay extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'netplay',
            group: 'misc',
            memberName: 'netplay',
            aliases: ['np'],
            description: 'Allows you to add or remove yourself from the netplay role.\n'
                + 'Use parameters "on" or "off", using no parameters will toggle.'
        });
    }

    async run(message, args) {
        var guild = getGuild.get();
        args = args.toLowerCase().trim();
        guild.fetchMember(message.author)
        .then((member) => {
            var hasRole;
            if(member.roles.get(netplayId) != undefined) {
                hasRole = true;
            }
            else {
                hasRole = false;
            }


            if(args === "on") {
                if(!hasRole) {
                    member.addRole(netplayId);
                    message.reply("Netplay role added.");
                }
            }
            else if(args === "off" && hasRole) {
                if(hasRole) {
                    member.removeRole(netplayId);
                    message.reply("Netplay role removed.");
                }
            }
            else {
                if(hasRole) {
                    member.removeRole(netplayId);
                    message.reply("Netplay role removed.");
                }
                else {
                    member.addRole(netplayId);
                    message.reply("Netplay role added.");
                }
            }
        });
    }
}

module.exports = netplay;