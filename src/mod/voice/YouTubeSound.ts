import * as config from "../../../config.json";
import {Sound} from "./Sound";
import ytdl = require("ytdl-core");
import {StreamDispatcher, VoiceChannel, VoiceConnection} from "discord.js";

const pathToPublic = __dirname + "/../../../public";

export class YouTubeSound extends Sound {
    private _url: string;
    private _dispatcher: StreamDispatcher;
    private _info: string;

    public constructor(url: string, info: string) {
        super();

        this._url = url;
        this._info = info;
    }

    public play(connection: VoiceConnection): Promise<StreamDispatcher> {
        return new Promise( (resolve, reject) => {
            if(connection === undefined)
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

    public stop() {
        this._dispatcher.end("requested");
    }

    public toString(): string {
        return "YouTube Video: " + this._info;
    }
}