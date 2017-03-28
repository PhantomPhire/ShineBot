const commando = require('discord.js-commando');
const bot = new commando.Client({	commandPrefix: 'shine ' });
const fs = require('fs');
const regionManager = require('./commands/region/regionManager.js');
const regionlessRole = '291600398354219018';
var welcomeMessage, token;

bot.registry.registerGroup("region", "Region");
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");


bot.on('ready', () =>
{
	bot.user.setGame('Shining until you start crying.');
});

bot.on('guildMemberAdd', (member) => {
    member.user.send(welcomeMessage);

    setTimeout(() => {
        member.addRole(regionlessRole);
    }, 4000);
});

token = fs.readFileSync(__dirname + "/../botLogins/shineBot.txt").toString();

welcomeMessage = fs.readFileSync(__dirname + "/utilities/welcomeMessage.txt");
let regions = regionManager.getRegionList();

for(let i = 0; i < regions.length; i++) {
    welcomeMessage += '\n' + regions[i];
} 

function attemptLogin() {
    bot.login(token);

    setTimeout(() => {
        if(bot.status != 0) {
            bot.emit('attemptLogin');
        }
        else {
            setTimeout(() => { 
                var getGuild = require('./utilities/getGuild.js');
                getGuild.giveClient(bot);
            }, 5000);
        }
    }, 10000);
}

bot.on('disconnect', attemptLogin);
bot.on('attemptLogin', attemptLogin);
attemptLogin();