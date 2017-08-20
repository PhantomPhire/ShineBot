import {Role} from "discord.js";
import fs = require("fs");

let mains: string[];
readIn();

export function readIn() {
    mains = require(__dirname + "/../../../../assets/mains.json") as string[];
}

export function isMain(input: string): boolean {
    return (mains.find( name => name.toLowerCase() === input.toLowerCase() ) !== undefined);
}

export function getMainList(): string[] {
    return mains;
}