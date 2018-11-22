import * as config from "../../../config.json";
import {Sound} from "./Sound";
import ytdl = require("ytdl-core");
import {StreamDispatcher, VoiceChannel, VoiceConnection} from "discord.js";

/**
 * Represents a YouTube video to be played as a sound by a discord bot utilizing the discord.js library.
 * @extends {Sound}
 */
export class YouTubeSound extends Sound {
    private _url: string;
    private _dispatcher: StreamDispatcher | undefined;
    private _info: string;

    /**
     * @param {string} url The url of the YouTube video to be played.
     * @param {string} info Information about the YouTube video to be displayed if requested.
     */
    public constructor(url: string, info: string) {
        super();

        this._url = url;
        this._info = info;
        this._dispatcher = undefined;
    }

    /**
     * Starts playback of the YouTube video as a sound.
     * @param {VoiceConnection} connection The connection to be utlizied for playing audio.
     * @returns {Promise<StreamDispatcher>}
     */
    public play(connection: VoiceConnection): Promise<StreamDispatcher> {
        return new Promise( (resolve, reject) => {
            if (connection === undefined)
                reject("Voice connection undefined in YouTubeSound.");
            const stream = ytdl(this._url, { filter: "audioonly" })
            .on("error", (error: Error) => {
                this.emit("error", error);
            });

            this._dispatcher = connection.playStream(stream, {});

            this._dispatcher.once("end", (reason: string) => {
                this.emit("end", reason);
            });

            this._dispatcher.once("error", (error: Error) => {
                this.emit("error", error);
            });

            resolve(this._dispatcher);
        });
    }

    /**
     * Ceases playback of the YouTube video.
     */
    public stop() {
        if (this._dispatcher !== undefined) {
            this._dispatcher.end("requested");
        }
    }

    /**
     * Translates YouTube video into a string value to be output.
     * @returns {string}
     */
    public toString(): string {
        return "YouTube Video: " + this._info;
    }
}