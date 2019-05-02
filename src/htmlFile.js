const { constants } = require('./constants');
const { logMagenta } = require('./console');
const { tryCreateDirAsync } = require('./dir');
const fs = require('fs');

class HtmlFile {
    constructor(fileName, targetDirectory){
        this._fileName = fileName;
        this._targetDirectory = targetDirectory;
    }

    writeToFileAsync(htmlString) {
        return new Promise(async resolve => {
            await tryCreateDirAsync(this._targetDirectory);
            const outputFilename = constants.distFolder + this._fileName;
            logMagenta(".md file -> " + outputFilename);
            fs.writeFile(outputFilename, htmlString , _ => _);
            resolve();
        }, _ => _);
    }
}

module.exports = {
    HtmlFile
}