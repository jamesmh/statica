#! /usr/bin/env node

const glob = require('glob');
const promisify = require('util').promisify;
const globAsync = promisify(glob);

const { constants } = require('./constants');
const { logGreen, logWithSpace } = require('./console');
const { convertMarkdownFilesToHtmlFiles } = require('./mardownFileCollectionConvert');
const { copyFilesToDistFolder } = require('./copyFilesToDistFolder');

// ---------------
// Process handles
// ---------------
process.on('exit', () => {
    logWithSpace(() => {
        logGreen("Phew! Statica is all done!");
        logGreen("Check './www' to see your compiled site.");
    });
});

// --------------------------
// Begin real work/processing
// --------------------------

const main = async () => {
    try {
        logWithSpace(() => logGreen('Statica is working...'));

        const files = await globAsync(constants.markdownFilesGlob, {
            ignore: [constants.distFolderGlob, constants.nodeModulesGlob] });

        await convertMarkdownFilesToHtmlFiles(files);

        const filesToCopy = await globAsync('**/**.*', {
            ignore: [constants.templateFile, constants.distFolderGlob, constants.markdownFilesGlob, constants.nodeModulesGlob]
        });

        await copyFilesToDistFolder(filesToCopy);
    } catch(err) {
        throw err;
    }
};

main();