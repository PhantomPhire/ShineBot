import * as config from "../../../../config.json";
import {Command, CommandoClient, CommandMessage} from "discord.js-commando";
import {Message, TextChannel} from "discord.js";
import {ServedGuild} from "../../voice";
import {YouTubeSound} from "../../voice";
import sounds = require("../../voice");
import {YouTube, Video} from "simple-youtube-api";
import util = require("../../voice/SoundUtil");

const maxResults = 3;

class PlayYouTube extends Command {
    private _yt: YouTube;

    constructor(client: CommandoClient) {
        super(client, {
            name: "youtube",
            group: "sounds",
            memberName: "youtube",
            aliases: ["yt"],
            description: "Plays audio from YouTube."
        });
        this._yt = new YouTube((<any>config).ytApiKey);
    }

    hasPermission(msg: CommandMessage): boolean {
        if (!msg.guild)
            return false;
		return msg.member.hasPermission("ADMINISTRATOR");
	}

    async run(msg: CommandMessage, args: string, fromPattern: boolean): Promise<Message | Message[] | void> {
        let userArgs: string[] | undefined = args.split(" ");

        if(userArgs[0] == "")
            return msg.say("Need arguments", {});

        let sGuild = ServedGuild.GetServerdGuild(msg.client, msg.guild.id);
        
        this._yt.getVideo(args)
        .then( (video: Video) => {
            sGuild.Add(new YouTubeSound(video.url, video.title));
        })
        .catch( () => {
            console.log("This is not a video.");

            this._yt.search(args, 5)
            .then((results) => {
                //console.log(result);
                let resultsNum = 0;
                let userQuery = "Please select from the following: \n\n";
                let vids = new Array<Video>();

                for(let i = 0; i < results.length; i++) {
                    let vid = results[i] as Video;
                    if(vid.type === "video") {
                        vids.push(vid);
                        resultsNum++;
                        userQuery += "    " + resultsNum + ". " + vid.title + "\n\n";

                        if(resultsNum >= maxResults) {
                            break;
                        }
                    }
                }

                msg.say(userQuery, {});

                (msg.channel as TextChannel).awaitMessages(messageFilter, { time: 60000, max: 5, maxMatches: 1})
                .then( (value) => {
                    let index = parseInt(value.first().content);
                    if(index > 0 && index <= resultsNum) {
                        sGuild.Add(new YouTubeSound(vids[index - 1].url, vids[index - 1].title));
                    }
                }).catch(console.error);
            }).catch(console.error);
        });
    }

    
}

module.exports = PlayYouTube;

function messageFilter(result: Message): boolean {
    let index = parseInt(result.content);

    if(index > 0) {
        return true;
    }

    return false;
}