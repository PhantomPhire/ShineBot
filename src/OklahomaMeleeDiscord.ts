/*
 * The reason for the existence of this file is to ensure that the bot always has
 * access to the guild this bot is intended for, even when operating outside of
 * the guild (such as in a DM).
 */
import {Guild} from "discord.js";
import {ShineBotConstants} from "./Constants";
import {ClientAccess} from "../DiscordBotUtils";

/**
 * A static container for access to the Oklahoma Melee Discord guild
 */
export abstract class OklahomaMeleeDiscord {
    /**
     * Gets the Oklahoma Melee Discord object
     */
    public static getGuild(): Guild | undefined {
        let client = ClientAccess.client();
        console.assert(client != undefined);

        if (client !== undefined) {
            return client.guilds.get(ShineBotConstants.oklahomaMeleeDiscordId);
        }
    }
}
