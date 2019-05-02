const fs = require('fs');
const { sortByLength } = require('./sortAlgorithms');
const { getDirectoryFromFile, tryCreateDirAsync } = require('./dir');
const { logMagenta } = require('./console');
const { constants } = require('./constants');

const copyFilesToDistFolder = async (files) => {
    files.sort(sortByLength);

    for (const file of files) {
        const newFileFullPath = constants.distFolder + file;
        const dir = getDirectoryFromFile(file);

        logMagenta("copying file -> " + newFileFullPath);
        await tryCreateDirAsync(constants.distFolder + dir);
        fs.copyFile(file, newFileFullPath, _ => _);
    }
}

module.exports = {
    copyFilesToDistFolder
}