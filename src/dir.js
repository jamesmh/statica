const promisify = require('util').promisify;
const mkdirp = promisify(require('mkdirp'));
const fs = require('fs');

const getDirectoryFromFile = file => {
    const array = file.split(/[/\\]/);
    return array.slice(0, array.length - 1).join("/");
}

const tryCreateDirAsync = async dir => {
    if(!fs.existsSync(dir))
        await mkdirp(dir); 
}      

module.exports = {
    getDirectoryFromFile, tryCreateDirAsync
}