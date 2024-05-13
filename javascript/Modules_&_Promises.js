const fs = require("fs");

function readFileAsync(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                reject(`Error reading file: ${err.message}`);
            } else {
                resolve(data);
            }
        });
    });
}

function writeFileAsync(filePath, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, content, (err) => {
            if (err) {
                reject(`Error writing to file: ${err.message}`);
            } else {
                resolve('Write operation successful');
            }
        });
    });
}

function processFiles(filePaths, manipulationType) {
    filePaths.forEach(async (filePath) => {
        try {
            const data = await readFileAsync(filePath);
            let modifiedContent;
            switch (manipulationType) {
                case 'timestamp':
                    modifiedContent = addTimestamp(data.toString());
                    break;
                case 'reverse':
                    modifiedContent = reverseContent(data.toString());
                    break;
                case 'uppercase':
                    modifiedContent = convertToUppercase(data.toString());
                    break;
                default:
                    modifiedContent = data.toString();
            }

            const newFilePath = filePath.replace('.txt', `_${manipulationType}_modified.txt`);
            await writeFileAsync(newFilePath, modifiedContent);
            console.log(`File ${newFilePath} successfully written.`);
        } catch (error) {
            console.error(`Error processing file ${filePath}: ${error}`);
        }
    });
}

function addTimestamp(content) {
    const timestamp = new Date().toISOString();
    return `${timestamp}\n${content}`;
}

function reverseContent(content) {
    return content.split('').reverse().join('');
}

function convertToUppercase(content) {
    return content.toUpperCase();
}

module.exports = {
    processFiles,
    addTimestamp,
    reverseContent,
    convertToUppercase,
};


