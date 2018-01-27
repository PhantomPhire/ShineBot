import {Client, VoiceChannel, VoiceConnection} from "discord.js";
import {VoiceStatus} from "./EVoiceStatus";
import {Sound} from "./Sound";
import {EventEmitter} from "events";

const musicalEmoji = " :musical_note: ";

export class GuildVoiceStateManager extends EventEmitter {
    private _client: Client;
    private _status: VoiceStatus;
    private _voiceChannel: VoiceChannel | undefined;
    private _currentSound: Sound | undefined;
    private _connection: VoiceConnection | undefined;

    constructor(client: Client) {
        super();
        this._client = client;
        this._status = VoiceStatus.Disconnected;
    }

    public play(sound: Sound): Promise<string> {
        return new Promise( (resolve, reject) => {
            if (this.connection === undefined)
                reject("No voice connection");

            sound.play(this.connection!);
            this.currentSound = sound;
            this.soundListen(this.currentSound);
            resolve("Now playing" + musicalEmoji + sound.toString() + musicalEmoji);
        });
    }

    public stop(): Promise<string> {
        return new Promise( (resolve, reject) => {
            if (this.connection === undefined)
                reject("No voice connection");

            if (this._currentSound === undefined)
                reject("Not currently playing");

            this._currentSound!.stop();
            resolve("Successfully stopped");
        });
    }

    public join(channel: VoiceChannel): Promise<string> {
        return new Promise( (resolve, reject) => {
            this._voiceChannel = channel;
            this._voiceChannel.join()
            .then( (connection) => {
                connection.on("disconnect", (error: Error) => { this.connection = undefined; });
                this.connection = connection;
                resolve("Successfully joined " + channel.toString());
            }).catch( (err) => {
                reject("Could not join channel");
            });
        });
    }

    public leave(): Promise<string> {
        return new Promise( (resolve, reject) => {
            if (this._voiceChannel === undefined) {
                reject("No voice connection");
            }

            this._voiceChannel!.leave();
            this._voiceChannel = undefined;
            resolve("Successfully left");
        });
    }

    private soundListen(sound: Sound) {
        sound.once("end", (reason: string, channel: VoiceChannel) => {
            console.log("Disconnect reason: " + reason);
            this.currentSound = undefined;
            this.emit("next");
        });
        sound.once("error", (error: Error, channel: VoiceChannel) => {
            console.log("Error: " + error);
            this.currentSound = undefined;
            this.emit("Error", error);
        });
    }

    private evaluateStatus() {
        if (this.connection === undefined) {
            this._status = VoiceStatus.Disconnected;
            return;
        }

        if (this.currentSound === undefined)
            this._status = VoiceStatus.Waiting;
        else
            this._status = VoiceStatus.Playing;
    }

    get status() {
        return this._status;
    }

    get voiceChannel() {
        return this._voiceChannel;
    }

    set voiceChannel(value) {
        this._voiceChannel = value;
    }

    private get currentSound(): Sound | undefined {
        return this._currentSound;
    }

    private set currentSound(value) {
        this._currentSound = value;
        this.evaluateStatus();
    }

    private get connection(): VoiceConnection | undefined {
        if (this._connection === undefined) {
            this._currentSound = undefined;
        }

        return this._connection;
    }

    private set connection(value) {
        this._connection = value;
        this.evaluateStatus();
    }
}