const logGreen = message => console.log('\x1b[32m%s\x1b[0m', message);
const logMagenta = message => console.log('\x1b[35m%s\x1b[0m', message);
const logWithSpace = logFunc => {
    console.log();
    logFunc();
    console.log();
}

module.exports = {
    logGreen, logMagenta, logWithSpace
}