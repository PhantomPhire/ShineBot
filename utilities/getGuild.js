/*
The reason for the existence of this file is to ensure that the bot always has
 access to the guild this bot is intended for, even when operating outside of 
 the guild (such as a DM). 
*/
const fs = require('fs');
var guild = undefined;

module.exports.giveClient = function(clientIn) {
    fs.readFile(__dirname + "/guild.txt", (error, data) => {
    if(error) {
        console.log("Error on login file read");
        return;
    }

    guild = clientIn.guilds.get(data.toString());

    if(guild == undefined)
        console.log('guild not found');
});
}

module.exports.get = function() {
    return guild;
}