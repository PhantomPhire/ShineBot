const commando = require('discord.js-commando');
const regionManager = require(__dirname + '/regionManager.js');
const getGuild = require(__dirname + '/../../utilities/getGuild.js');

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

    async run(msg, args) {
        var userArgs = args.split(' ');

        var region = userArgs[0];

        if(region === undefined) {
            msg.reply('Please provide a region as a parameter.');
            return;
        }
        else
            region = region.toLowerCase();

        if(!regionManager.isRegion(region)) {
            msg.reply(region + ' is not a valid region');
            return;
        }

        var guild = undefined;

        if(msg.guild == null) {
            guild = getGuild.get();
        }
        else {
            guild = msg.guild;
        }

        var roleToSet = regionManager.getRole(region);
        guild.fetchMember(msg.author)
        .then((member) => {
            var roles = member.roles.filterArray(r => (regionManager.isRegion(r.name.toLowerCase()) || r.name === 'Regionless'));

            for(let i = 0; i < roles.length; i++) {
                member.removeRole(roles[i].id)
                .catch(console.log);
            }

            member.addRole(roleToSet.id)
            .then(msg.reply('your region is now set to ' + roleToSet.name + '.'));
        });
    }
}

module.exports = setRegion;