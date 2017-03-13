const commando = require('discord.js-commando');
const regionManager = require(__dirname + '/regionManager.js');

class getRegion extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'getregion',
            group: 'region',
            memberName: 'getregion',
            aliases: ['gr'],
            description: 'Prints out a list of valid regions.'
        });
    }


    async run(message, args) {
        let regions = regionManager.getRegionList();
        let regionPrint = "";

        for(let i = 0; i < regions.length; i++) {
            regionPrint += '\n' + regions[i];
        }

        message.say("Here is the list of valid regions:" + regionPrint);
    }
}

module.exports = getRegion;