import {Role} from "discord.js";
import fs = require("fs");
import getGuild = require("../guild");

let regions: string[];
readIn();

export function readIn() {
    regions = [];
    fs.readFile(__dirname + "/../../../assets/regions.txt", (error: Error, data: Buffer) => {
        regions = data.toString().split(",\r\n");
    });
}

export function isRegion(input: string): boolean {
    return (regions.find( name => name.toLowerCase() === input ) !== undefined);
}

export function getRole(input: string): Role {
    return getGuild.getGuild()!.roles.find(r => r.name.toLowerCase() === input);
}

export function getRegionList(): string[] {
    return regions;
}