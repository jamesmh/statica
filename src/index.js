const fs = require('fs');
const readline = require('readline');
const glob = require('glob');
const marked = require('marked');
const staticaContentRegex = /[<][!][-][-][@]Content[(][)][-][-][>]/;
const distFolder = "www/";
const assetsFolderGlob = "assets/**/**.*";
const markdownFilesGlob = '**/**.md';
const distFilesGlob = "www/**/**.*";
const templateFile = "_template.html";

const getDirectoryFromFile = file => {
    const array = file.split(/[/\\]/);
    return array.slice(0, array.length - 1).join("/");
}

const tryCreateDir = dir => {
    if(!fs.existsSync(dir))
        fs.mkdirSync(dir); 
}           

const throwErr = err => {
    if(err)
        throw err;
}


const processMarkdownFiles = async (err, markdownFiles) => {
    if(err) throw err;

    markdownFiles.sort((a, b) => a.length >= b.length);

    for (const file of markdownFiles) {            
        const templateLines = readline.createInterface({ input: fs.createReadStream(templateFile) });
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
            const filename = file.replace(/[.]md$/, '');
            const targetDir = getDirectoryFromFile(distFolder + file);

            tryCreateDir(targetDir);

            const outputFilename = distFolder + filename + ".html";
            fs.writeFile(outputFilename, newContentArray.join(""), throwErr);
        });
    }
}

const copyFilesToOutputFolder = async (err, files) => {
    files.sort((a, b) => a.length >= b.length);

    for(const file of files) {
        const dir = getDirectoryFromFile(file);
        tryCreateDir(distFolder + dir);
        fs.copyFile(file, distFolder + file, throwErr);
    }
}

glob(markdownFilesGlob, {
    ignore: [assetsFolderGlob]
}, processMarkdownFiles);

glob('**/**.*', { ignore: [templateFile, distFilesGlob, markdownFilesGlob, assetsFolderGlob] }, copyFilesToOutputFolder);

glob(assetsFolderGlob, copyFilesToOutputFolder);