const fs = require('fs');
const readline = require('readline');
const glob = require('glob');
const marked = require('marked');
const staticaContentRegex = /[<][!][-][-][@]Content[(][)][-][-][>]/;

const processMarkdownFiles = async (err, markdownFiles) => {
    if(err) throw err;

    for (const file of markdownFiles) {            
        const templateLines = readline.createInterface({ input: fs.createReadStream("./_template.html") });
        let newContentArray = [];
        templateLines.on('line', line => {
            if(staticaContentRegex.test(line)) {
                const markdownText = fs.readFileSync(file).toString();
                const processedMarkdown = marked(markdownText);
                line = line.replace(staticaContentRegex, processedMarkdown);
            }
            newContentArray.push(line);
        });
        templateLines.on('close', () => {
            const fileWithoutExtension = file.replace(/[.]md$/, '');
            const targetDir = "./dir/" + fileWithoutExtension.replace(/[\\/][^\\/].*$/, '')

            if(!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir);            
            }
            const outputFilename = "./dist/" + fileWithoutExtension + ".html";
            fs.writeFile(outputFilename, );
        });
    }

}

glob('**/*.md', {
    ignore: ['./assets/**.*']
}, processMarkdownFiles);