/*
The reason for the existence of this file is to ensure that the bot always has
 access to the guild this bot is intended for, even when operating outside of 
 the guild (such as in a DM). 
*/
import {Client, Guild} from "discord.js";
import fs = require("fs");

const id = "289489728615743488";
var client: Client;

export function injectClient(clientIn: Client) {
    client = clientIn;
}

export function getGuild(): Guild | undefined {
    return client.guilds.get(id);
}