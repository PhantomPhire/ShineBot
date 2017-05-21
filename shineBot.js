const commando = require('discord.js-commando');
const bot = new commando.Client({	commandPrefix: 'shine ' });
const fs = require('fs');
const regionManager = require('./commands/region/regionManager.js');
const regionlessRole = '291600398354219018';
var welcomeMessage, token;

bot.registry.registerGroup("region", "Region");
bot.registry.registerGroup("misc", "Misc");
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
    console.log('attempting login');
    bot.login(token).catch((err) => {
        console.log('Login Failed');
        console.log(err);
    });

    setTimeout(() => {
        if(bot.status == 5 || bot.status == 3) {
            console.log('login attempt timed out');
            console.log('Status: ' + bot.status);
            bot.emit('attemptLogin');
        }
        else if(bot.status != 0) {
            bot.emit('WaitAttempt');
        }
        else {
            console.log('login successful');
            setTimeout(() => { 
                var getGuild = require('./utilities/getGuild.js');
                getGuild.injectClient(bot);
            }, 5000);
        }
    }, 10000);
}

function waitThenLogin() {
    setTimeout(() => {
        if(bot.status == 5 || bot.status == 3) {
            console.log('Waited, status: ' + bot.status);
            attemptLogin();
        }
        else if(bot.status != 0) {
            bot.emit('WaitAttempt');
        }
    }, 10000);
}

bot.on('disconnect', waitThenLogin);
bot.on('WaitAttempt', waitThenLogin);
bot.on('attemptLogin', attemptLogin);
attemptLogin();