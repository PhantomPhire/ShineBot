const commando = require('discord.js-commando');
const bot = new commando.Client({	commandPrefix: 'shine ' });
const fs = require('fs');
const regionManager = require(__dirname + '/command/region/regionManager.js');
var welcomeMessage = '';

bot.registry.registerGroup("region", "Region");
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/command");


bot.on('ready', () =>
{
	bot.user.setGame('Shining until you start crying.');
});

bot.on('guildMemberAdd', (member) => {
    member.user.send(welcomeMessage);
});

fs.readFile(__dirname + "/../botLogins/shineBot.txt", (error, data) => {
    if(error) {
        console.log("Error on login file read");
        return;
    }

    bot.login(data.toString());
});

fs.readFile(__dirname + "/shineBot_util/welcomeMessage.txt", (error, data) => {
    if(error) {
        console.log("Error on welcome message file read");
        return;
    }

    welcomeMessage = data.toString();
    let regions = regionManager.getRegionList();

    for(let i = 0; i < regions.length; i++) {
        welcomeMessage += '\n' + regions[i];
    }
});

var getGuild = require(__dirname + '/shineBot_util/getGuild.js');
getGuild.giveClient(bot);
