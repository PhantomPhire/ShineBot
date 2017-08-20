import {Guild, GuildMember, GuildChannel, VoiceChannel} from "discord.js";

export function findMemberUsername(input: string, guild: Guild): GuildMember | undefined {
    return guild.members.find( (member: GuildMember) => member.user.username.toLowerCase() === input.toLowerCase());
}

export function findMemberDisplayName(input: string, guild: Guild): GuildMember | undefined {
    return guild.members.find( (member: GuildMember) => member.displayName.toLowerCase() === input.toLowerCase());
}

export function findMemberName(input: string, guild: Guild): GuildMember | undefined {
    var result = findMemberUsername(input, guild);

    if(result != undefined) {
        return result;
    }

    //redundant in cases where user does not have nickname, but covers all bases
    return findMemberDisplayName(input,guild);
}

export function findMemberUsernamePartial(input: string, guild: Guild): GuildMember | undefined {
    return guild.members.find( (member: GuildMember) => member.user.username.toLowerCase().indexOf(input.toLowerCase()) > -1);
}

export function findMemberDisplayNamePartial(input: string, guild: Guild): GuildMember | undefined {
    return guild.members.find( (member: GuildMember) => member.displayName.toLowerCase().indexOf(input.toLowerCase()) > -1);
}

export function findMemberNamePartial(input: string, guild: Guild): GuildMember | undefined {
    var result = findMemberUsernamePartial(input, guild);

    if(result != undefined) {
        return result;
    }

    //redundant in cases where user does not have nickname, but covers all bases
    return findMemberDisplayNamePartial(input,guild);
}

export function findVoiceChannel(input: string, guild: Guild): VoiceChannel | undefined {
    return guild.channels.find( (channel: GuildChannel) => (channel.name.toLowerCase() === input) && (channel.type === "voice")) as VoiceChannel;
}

export function findVoiceChannelPartial(input: string, guild: Guild): VoiceChannel | undefined {
    return guild.channels.find( (channel: GuildChannel) => (channel.name.toLowerCase().indexOf(input.toLowerCase()) > -1 && (channel.type === "voice"))) as VoiceChannel;
}