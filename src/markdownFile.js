const {
    readFileLineByLine
} = require('./file');
const marked = require('marked');
const fs = require('fs');
const {
    constants
} = require('./constants');

const staticaContentRegex = /[<][!][-][-][@]Content[(][)][-][-][>]/;

class MarkdownFile {
    constructor(markdownFilePath) {
        this._markdownFilePath = markdownFilePath;
    }

    toHtmlStringAsync() {
        return new Promise(async resolve => {
            let newContentArray = [];
            const appendLineToContentArray = line => {
                if (staticaContentRegex.test(line)) {
                    const markdownText = fs.readFileSync(this._markdownFilePath).toString();
                    const processedMarkdown = marked(markdownText);
                    line = line.replace(staticaContentRegex, processedMarkdown);
                }
                newContentArray.push(line);
            };

            await readFileLineByLine(constants.templateFile, appendLineToContentArray, _ => _);

            const htmlString = newContentArray.join("");

            resolve(htmlString);
        }, _ => _);
    }
}

module.exports = {
    MarkdownFile
}