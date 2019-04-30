const promisify = require('util').promisify;
const fs = require('fs');
const readline = require('readline');
const glob = require('glob');
const marked = require('marked');
const mkdirp = promisify(require('mkdirp'));
const staticaContentRegex = /[<][!][-][-][@]Content[(][)][-][-][>]/;
const distFolder = "www/";
const assetsFolderGlob = "assets/**/*.*";
const distFolderGlob = "www/**/*.*";
const markdownFilesGlob = '**/*.md';
const templateFile = "_template.html";

const logGreen = message => console.log('\x1b[32m%s\x1b[0m', message);
const logRed = message => console.log('\x1b[31m%s\x1b[0m', message);
const logMagenta = message => console.log('\x1b[35m%s\x1b[0m', message);

console.log('');
logGreen('Statica is working...')
console.log('');

const getDirectoryFromFile = file => {
    const array = file.split(/[/\\]/);
    return array.slice(0, array.length - 1).join("/");
}

const tryCreateDir = async dir => {
    if(!fs.existsSync(dir))
        await mkdirp(dir); 
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
        templateLines.on('close', async () => {
            const filename = file.replace(/[.]md$/, '');
            const targetDir = getDirectoryFromFile(distFolder + file);

            await tryCreateDir(targetDir);

            const outputFilename = distFolder + filename + ".html";

            logMagenta(`processing ` + outputFilename);
            fs.writeFile(outputFilename, newContentArray.join(""), throwErr);
        });
    }
}

const copyFilesToOutputFolder = async (err, files) => {
    files.sort((a, b) => a.length >= b.length);

    for(const file of files) {
        const dir = getDirectoryFromFile(file);
        await tryCreateDir(distFolder + dir);
        logMagenta(`processing ` + distFolder + file);
        fs.copyFile(file, distFolder + file, throwErr);
    }
}

glob(markdownFilesGlob, {
    ignore: [assetsFolderGlob, distFolderGlob]
}, processMarkdownFiles);

glob('**/**.*', { ignore: [templateFile, distFolderGlob, markdownFilesGlob, assetsFolderGlob] }, copyFilesToOutputFolder);

glob(assetsFolderGlob, copyFilesToOutputFolder);

process.on('exit', () => {
    console.log();
    logGreen("Phew! Statica is all done!");
    logGreen("Check './www' to see your compiled site.");
})