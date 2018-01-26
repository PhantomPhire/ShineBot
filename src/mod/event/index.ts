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

    // Naughty word parsing
    // DISCLAIMER: The words depicted below are offensive. The purpose of this
    // section of code is to time anyone who uses said words out.
    bot.on("message", (message: Message) => {
        if (message.member == null) {
            return;
        }

        let msg = message.content.toLowerCase();

        if (msg.indexOf("nig" + "ger") > -1) {
            message.member.ban({
                days: 1,
                reason: "Using the n word"
            }).catch(console.log);
            message.delete().catch(console.log);
        }
        else if (msg.indexOf("nig" + "ga") > -1) {
            message.member.addRole("325090806048358400").catch(console.log);
            message.delete().catch(console.log);
        }
    });
}