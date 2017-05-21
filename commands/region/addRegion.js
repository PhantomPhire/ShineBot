const commando = require('discord.js-commando');
const fs = require('fs');
const regionManager = require(__dirname + '/regionManager.js');

class addRegion extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'addregion',
            group: 'region',
            memberName: 'addregion',
            description: 'Adds a region and appends it to the region file.'
        });
    }

    hasPermission(msg) {
        if(!msg.guild) 
            return msg.author.id === this.client.options.owner;
		return msg.member.hasPermission('ADMINISTRATOR');
	}

    async run(msg, args) {
        fs.appendFile(__dirname + '/regions.txt', ',\r\n' + args, (err) => {
            if (err)
                throw err;
            else
                regionManager.readIn();
        });

        msg.say('Region added');
    }
}

module.exports = addRegion;
