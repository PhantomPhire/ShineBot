var client = null;

module.exports.giveClient = function(clientIn) {
    client = clientIn;
}

module.exports.get = function() {
    if(client != null)
        return client.guilds.array()[0];
}