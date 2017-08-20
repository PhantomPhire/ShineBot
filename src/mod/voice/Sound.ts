import {StreamDispatcher, VoiceConnection} from "discord.js";
import {EventEmitter} from "events";

export abstract class Sound extends EventEmitter{
    public constructor() {
        super();
    }

    public abstract play(connection: VoiceConnection): Promise<StreamDispatcher>;
    public abstract stop(): void;
    public abstract toString(): string;
}