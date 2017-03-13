const fs = require('fs');
const getGuild = require(__dirname + '/../../shineBot_util/getGuild.js');
var regions = [];
readIn();

//reads in the names of the regions pre-specified in a text file named regions.txt 
function readIn() {
    fs.readFile(__dirname + "/regions.txt", (error, data) => {
        regions = data.toString().split(',\r\n');
    });
}

//verifies the string submitted is actually a region
module.exports.isRegion = function(input) {
    for(let i = 0; i < regions.length; i++) {
        if(input === regions[i])
            return true;
    }

    return false;
}

//gets role object from plaintext region submission
module.exports.getRole = function(input) {
    var role = null;
    var roles = getGuild.get().roles.array();

    for(let i = 0; i < roles.length; i++) {
        if(roles[i].name.toLowerCase() === input)
            return roles[i];
    }
}

//gives region list to anything asking for it
module.exports.getRegionList = function() {
    return regions;
}