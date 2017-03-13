/*
The reason for the existence of this file is to ensure that the bot always has
 access to the guild this bot is intended for, even when operating outside of 
 the guild (such as a DM). 

 Right now, this is implemented in a not so good way. It relies on the
 assumption that said guild is the only guild the bot is in or that the guild
 in question is first in the array. A better solution would be to serialize 
 the guild as a .json and read from that upon start-up. Will do later. For
 now, just chalk it up to my laziness.

 -SweetWilly
*/
var client = null;

module.exports.giveClient = function(clientIn) {
    client = clientIn;
}

module.exports.get = function() {
    if(client != null)
        return client.guilds.array()[0];
}