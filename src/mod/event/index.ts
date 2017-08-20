import {Message} from "discord.js";
import {CommandoClient} from "discord.js-commando";
import fs = require("fs");
import regionManager = require("../commands/region/regionManager");
import ServedGuild = require("../voice/ServedGuild");

const regionlessRole = "291600398354219018";

let bot: CommandoClient;
let welcomeMessage = fs.readFileSync(__dirname + "/../../../assets/welcomeMessage.txt", "utf8");
let regions = regionManager.getRegionList();

for (let i = 0; i < regions.length; i++) {
    welcomeMessage += "\n" + regions[i];
}

export function injectBot(injectedBot: CommandoClient) {
    bot = injectedBot;

    bot.on("ready", () => {
        bot.user.setGame("Shining until you start crying.");
        ServedGuild.loadState(bot);
    });

    bot.on("guildMemberAdd", (member) => {
        member.user.send(welcomeMessage);

        setTimeout(() => {
            member.addRole(regionlessRole);
        }, 4000);
    });
}