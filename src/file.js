const fs = require('fs');
const readline = require('readline');

const readFileLineByLine = async (file, onLineRead, onClose) => {
    const templateLines = readline.createInterface({
        input: fs.createReadStream(file)
    });
    const promise = new Promise(resolve => {
        templateLines.on('line', line => {
            onLineRead(line);
        });
        templateLines.on('close', async () => {
            onClose();
            resolve();
        });
    }, _ => _);

    return promise;
}

module.exports = {
    readFileLineByLine
}