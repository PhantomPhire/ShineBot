import * as config from "../config.json";
import {CommandoClient} from "discord.js-commando";
import event = require("./mod/event");
import loginManager = require("./mod/login");
import getGuild = require("./mod/guild");

const bot = new CommandoClient({ commandPrefix: (<any>config).prefix, owner: (<any>config).owner });
event.injectBot(bot);
getGuild.injectClient(bot);
loginManager.injectBot(bot, (<any>config).token);
bot.registry.registerGroup("region", "Region");
bot.registry.registerGroup("misc", "Misc");
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/mod/commands");