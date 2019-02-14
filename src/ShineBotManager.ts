import * as config from "../../config.json";
import {Message, GuildMember} from "discord.js";
import {CommandoClient} from "discord.js-commando";
import {RegionManager} from "./utility/RegionManager";
import {MainManager} from "./utility/MainManager";
import {BotManager, GuildAudioPlayer} from "../DiscordBotUtils";
import {ShineBotConstants} from "./Constants";
import fs = require("fs");

/**
 * A wrapper for the ShineBot, managing its events and internals
 */
export class ShineBotManager extends BotManager {
    /**
     * The welcome message to send upon a new member joining the guild.
     */
    private _welcomeMessage: string = "";

    /**
     * Initializes a new instance of the ShineBotManager class.
     */
    constructor() {
        super(new CommandoClient({ commandPrefix: (<any>config).prefix, owner: (<any>config).owner }));
        RegionManager.initialize();
        MainManager.initialize();
    }

    /**
     * Executes the running for the bot.
     */
    public run() {
        super.run((<any>config).token);

        this.setupEventListeners();
        this.initalizeWelcomeMessage();

        // Read in commands
        this._bot.registry.registerGroup("region", "Region");
        this._bot.registry.registerGroup("sounds", "Sounds");
        this._bot.registry.registerGroup("melee", "Melee");
        this._bot.registry.registerGroup("misc", "Misc");
        this._bot.registry.registerDefaults();
        this._bot.registry.registerCommandsIn(__dirname + "/commands");
    }

    /**
     * Sets up the bot's event listeners.
     */
    private setupEventListeners() {
        // Add function for when bot is ready
        this._bot.on("ready", () => {
            this._bot.user.setActivity("Shining until you start crying.");
            GuildAudioPlayer.loadPersistentGuilds();
        });

        // Add function for sending new members a welcome message
        this._bot.on("guildMemberAdd", (member: GuildMember) => {
            member.user.send(this._welcomeMessage);

            setTimeout(() => {
                member.addRole(ShineBotConstants.regionlessRole);
            },         4000);
        });

        // Naughty word parsing
        // DISCLAIMER: The words depicted below are offensive. The purpose of this
        // section of code is to time anyone who uses said words out.
        this._bot.on("message", (message: Message) => {
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
                message.member.addRole("").catch(console.log);
            }
        });
    }

    /**
     * Reads in the welcome message for the bot.
     */
    private initalizeWelcomeMessage() {
        this._welcomeMessage = fs.readFileSync(ShineBotConstants.assetPath + "welcomeMessage.txt", "utf8");
        let regions = RegionManager.regions;
        for (let i = 0; i < regions.length; i++) {
            this._welcomeMessage += "\n" + regions[i];
        }
    }
}
