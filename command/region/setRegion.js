const commando = require('discord.js-commando');
const fs = require('fs');
const regionManager = require(__dirname + '/regionManager.js');
const getGuild = require(__dirname + '/../../shineBot_util/getGuild.js');

class setRegion extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'setregion',
            group: 'region',
            memberName: 'setregion',
            aliases: ['sr'],
            description: 'Allows you to set your region in Oklahoma. For a list of choices, use the getregion command.'
        });
    }

    /*hasPermission(message) {
		return msg.member.hasPermission('ADMINISTRATOR');
	}*/

    async run(message, args) {
        var userArgs = message.parseArgs(args, 1);
        userArgs = userArgs.split(' ');

        var region = userArgs[0];

        if(region == null || region == undefined) {
            message.reply('Please provide a region as a parameter.');
            return;
        }
        else
            region = region.toLowerCase();

        if(!regionManager.isRegion(region)) {
            message.reply(region + ' is not a valid region');
            return;
        }

        var guild = null;

        if(message.guild == null) {
            guild = getGuild.get();
        }
        else {
            guild = message.guild;
        }

        var roleToSet = regionManager.getRole(region);
        guild.fetchMember(message.author)
        .then((member) => {
            setMemberRoles(member, roleToSet, message);
        });
    }
}

//Finds old region, removes, then adds new one
function setMemberRoles(member, roleToSet, message) {
    var roles = member.roles.array();

    for(let i = 0; i < roles.length; i++) {
        if(regionManager.isRegion(roles[i].name.toLowerCase()))
            member.removeRole(roles[i].id)
            .catch(console.error);
    }

    member.addRole(roleToSet.id)
    .then(message.reply('your region is now set to ' + roleToSet.name + '.'));
}

function error(e)
{
	console.log(e.stack);
	process.exit(0);
}

module.exports = setRegion;