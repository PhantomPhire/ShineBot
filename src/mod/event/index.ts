import {Message} from "discord.js";
import {CommandoClient} from "discord.js-commando";
import fs = require("fs");
import regionManager = require("../region");

const regionlessRole = "291600398354219018";

var bot: CommandoClient;
var welcomeMessage = fs.readFileSync(__dirname + "/../../../assets/welcomeMessage.txt", "utf8");
let regions = regionManager.getRegionList();

for(let i = 0; i < regions.length; i++) {
    welcomeMessage += "\n" + regions[i];
} 

export function injectBot(injectedBot: CommandoClient) {
    bot = injectedBot;

    bot.on("ready", () => {
        bot.user.setGame("Shining until you start crying.");
    });

    bot.on("guildMemberAdd", (member) => {
        member.user.send(welcomeMessage);

        setTimeout(() => {
            member.addRole(regionlessRole);
        }, 4000);
    });
}