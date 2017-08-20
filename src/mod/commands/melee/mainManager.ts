import {Role} from "discord.js";
import fs = require("fs");

let mains: string[];
readIn();

export function readIn() {
    mains = require(__dirname + "/../../../../assets/mains.json") as string[];
}

export function isMain(input: string): boolean {
    return (mains.find( name => formatString(name).includes(formatString(input)) ) !== undefined);
}

export function getMainList(): string[] {
    return mains;
}

export function formatString(input: string): string {
    return input.toLowerCase().replace(/\./g, "");
}