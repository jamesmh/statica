const { sortByLength } = require('./sortAlgorithms');
const { MarkdownFile } = require('./markdownFile');
const { HtmlFile } = require('./htmlFile');
const { getDirectoryFromFile } = require('./dir');
const { constants } = require('./constants');

const convertMarkdownFilesToHtmlFiles = async (markdownFiles) => { 
    markdownFiles.sort(sortByLength);

    for(file of markdownFiles) {
        const htmlString = await new MarkdownFile(file).toHtmlStringAsync();

        const newHtmlFileName = file.replace(/[.]md$/, '') + ".html";
        const targetDir = getDirectoryFromFile(constants.distFolder + newHtmlFileName);

        await new HtmlFile(newHtmlFileName, targetDir).writeToFileAsync(htmlString);
    };
}

module.exports = {
    convertMarkdownFilesToHtmlFiles
}