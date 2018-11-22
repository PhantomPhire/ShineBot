import {StreamDispatcher, VoiceConnection} from "discord.js";
import {EventEmitter} from "events";

/**
 * Represents a sound to be played by a discord bot utilizing the discord.js library.
 * @extends {EventEmitter}
 */
export abstract class Sound extends EventEmitter {
    public constructor() {
        super();
    }

    /**
     * Starts playback of the sound.
     * @param {VoiceConnection} connection The connection to be utlizied for playing audio.
     * @returns {Promise<StreamDispatcher>}
     */
    public abstract play(connection: VoiceConnection): Promise<StreamDispatcher>;

    /**
     * Ceases playback of the sound.
     */
    public abstract stop(): void;

    /**
     * Translates sound into a string value to be output.
     * @returns {string}
     */
    public abstract toString(): string;
}