import {Client, Guild, TextChannel, VoiceChannel, VoiceConnection} from "discord.js";
import {Sound} from "./Sound";
import {GuildVoiceStateManager} from "./GuildVoiceStateManager";
import {VoiceStatus} from "./EVoiceStatus";
import {Queue} from "../utilities/Queue";
import {ServedGuildSaveState} from "./ServedGuildSaveState";

const musicalEmoji = " :musical_note: ";

export class ServedGuild {
    private _id: string;
    private _manager: GuildVoiceStateManager;
    private _queue: Queue<Sound>;

    private static guildMap: Map<string, ServedGuild> = new Map();

    constructor(client: Client, id: string) {
        this._id = id;
        this._manager = new GuildVoiceStateManager(client);
        this._queue = new Queue<Sound>();
        this._manager.on("next", () => { this.next(); });
    }

    public Add(sound: Sound) {
        this._queue.enqueue(sound);
        this.sendFeedback("Added" + musicalEmoji  + sound.toString() + musicalEmoji + " for playback");
    }

    public RemoveNext() {
        if (this._queue.isEmpty()) {
            this.sendFeedback("Nothing in playlist");
            return;
        }

        let sound = this._queue.dequeue();
        this.sendFeedback("Successfully removed" + musicalEmoji + sound!.toString() + musicalEmoji);
    }

    public Clear() {
        this._queue.clear();
    }

    public play() {
        if (this._manager.status === VoiceStatus.Playing) {
            this.sendFeedback("Already playing");
            return;
        }
        if (this._queue.isEmpty()) {
            this.sendFeedback("Nothing in playlist");
            return;
        }

        let sound = this._queue.dequeue();

        if (this._manager.status === VoiceStatus.Disconnected) {
            if (this._boundVoiceChannel === undefined) {
                this.sendFeedback("No voice channel to bind to");
                return;
            }

            this._manager.join(this._boundVoiceChannel!)
            .then( (joinMessage) => {
                console.log(joinMessage);
                this._manager.play(sound!)
                .then( (playMessage) => {
                    this.sendFeedback(playMessage);
                }).catch( (reason: string) => { this.sendFeedback(reason) });
            }).catch( (reason: string) => { this.sendFeedback(reason) });;
        }

        else {
            this._manager.play(sound!)
            .then( (playMessage) => {
                this.sendFeedback(playMessage);
            }).catch( (reason: string) => { this.sendFeedback(reason) });;
        }
    }

    public Skip() {
        if(this._queue.isEmpty()) {
            this.Stop();
            return;
        }

        this._manager.stop()
        .catch( (reason: string) => { this.sendFeedback(reason) });
    }

    public Stop() {
        this._manager.stop()
        .then( (message) => {
            this.sendFeedback("Playback stopped");
        }).catch( (reason: string) => { this.sendFeedback(reason) });
    }

    public Join(channel: VoiceChannel) {
        if (channel === this._manager.voiceChannel) {
            this.sendFeedback("Already there");
            return;
        }

        this.BoundVoiceChannel = channel;
        this._manager.join(this._boundVoiceChannel!)
        .then( (joinMessage) => {
            this.sendFeedback("Joined " + channel.toString() + " and set as bound voice channel");
        }).catch( (reason: string) => { this.sendFeedback(reason) });
    }

    public Leave() {
        if (this._manager.voiceChannel === undefined) {
            this.sendFeedback("Not in a channel");
            return;
        }
        
        let channel = this._manager.voiceChannel;
        this._manager.leave().catch(console.error);
        this.sendFeedback("Left " + channel!.toString());
    }

    public GetQueue(): string {
        let info = "The following sounds are in the queue:";
        let queueMembers = this._queue.toArray();

        for(let i = 0; i < queueMembers.length; i++) {
            info += "\n\n" + (i + 1) + ". " + queueMembers[i].toString();
        }

        return info;
    }

    private next() {
        if (this._queue.isEmpty()) {
            this.Leave();
            return;
        }

        let sound = this._queue.dequeue();
        this._manager.play(sound!)
        .then( (playMessage) => {
            this.sendFeedback(playMessage);
        }).catch( (err) => {
            console.error(err);
            this.sendFeedback("Someone dun goofed");
        });
    }

    private sendFeedback(feedback: string) {
        if (this._feedbackChannel !== undefined)
            this._feedbackChannel.send(feedback);
    }

    private saveState() {
        let guildArr = new Array<ServedGuildSaveState>();

        ServedGuild.guildMap.forEach( (value, key, map) => {
            let boundVoiceChannelId, feedbackChannelId;
            if (value.BoundVoiceChannel !== undefined)
                boundVoiceChannelId = value.BoundVoiceChannel.id;
            if (value.FeedbackChannel !== undefined)
                feedbackChannelId = value.FeedbackChannel.id;

            let sGuildSave = new ServedGuildSaveState(value.Id, boundVoiceChannelId, feedbackChannelId);
            guildArr.push(sGuildSave);
        });

        fs.writeFile(__dirname + "/guildMap.json", JSON.stringify(guildArr), {encoding: "utf8"}, (err: Error) => { if (err) throw err; });
    }

    get Id(): string {
        return this._id;
    }

    private _boundVoiceChannel?: VoiceChannel;

    get BoundVoiceChannel(): VoiceChannel | undefined {
        return this._boundVoiceChannel;
    }

    set BoundVoiceChannel(value) {
        this._boundVoiceChannel = value;
        if (ServedGuild.guildMap.has(this._id))
            this.saveState();
    }

    private _feedbackChannel?: TextChannel;

    get FeedbackChannel(): TextChannel | undefined {
        return this._feedbackChannel;
    }

    set FeedbackChannel(value) {
        this._feedbackChannel = value;
        if (ServedGuild.guildMap.has(this._id))
            this.saveState();
    }

    public static GetServerdGuild(client: Client, id: string): ServedGuild {
        if(!ServedGuild.guildMap.has(id)) {
            ServedGuild.guildMap.set(id, new ServedGuild(client, id));
        }

        return ServedGuild.guildMap.get(id)!;
    }

    public static LoadSaveState(state: ServedGuildSaveState, client: Client) {
        if(!ServedGuild.guildMap.has(state.Id)) {
            let sGuild = new ServedGuild(client, state.Id);
            if (state.BoundVoiceChannelId !== undefined)
                sGuild.BoundVoiceChannel = client.channels.get(state.BoundVoiceChannelId) as VoiceChannel;
            if (state.FeedbackChannelId !== undefined)
                sGuild.FeedbackChannel = client.channels.get(state.FeedbackChannelId) as TextChannel;
            ServedGuild.guildMap.set(state.Id, sGuild);
        }
    }
}

import fs = require("fs");

export function loadState(client: Client) {
    if (fs.existsSync(__dirname + "/guildMap.json")) {
        let file = fs.readFileSync(__dirname + "/guildMap.json");
        let guilds = JSON.parse(file.toString()) as ServedGuildSaveState[];

        for (let i = 0; i < guilds.length; i++) {
            ServedGuild.LoadSaveState(guilds[i], client);
        }
    }
}