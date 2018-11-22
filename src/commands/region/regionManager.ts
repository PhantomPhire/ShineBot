import {Role} from "discord.js";
import fs = require("fs");

let regions: string[];
readIn();

export function readIn() {
    regions = require(__dirname + "/../../../../assets/regions.json") as string[];
}

export function isRegion(input: string): boolean {
    return (regions.find( name => name.toLowerCase() === input.toLowerCase() ) !== undefined);
}

export function getRegionList(): string[] {
    return regions;
}