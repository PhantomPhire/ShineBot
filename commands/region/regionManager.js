const fs = require('fs');
const getGuild = require(__dirname + '/../../utilities/getGuild.js');
var regions = [];
readIn();

//reads in the names of the regions pre-specified in a text file named regions.txt 
function readIn() {
    regions = [];
    fs.readFile(__dirname + "/regions.txt", (error, data) => {
        regions = data.toString().split(',\r\n');
    });
}
module.exports.readIn = readIn();

//verifies the string submitted is actually a region
module.exports.isRegion = function(input) {
    return (regions.find( name => name.toLowerCase() === input ) !== undefined);
}

//gets role object from plaintext region submission
module.exports.getRole = function(input) {
    return getGuild.get().roles.find(r => r.name.toLowerCase() === input);
}

//gives region list to anything asking for it
module.exports.getRegionList = function() {
    return regions;
}