const fs = require('fs');
fs.readdir(process.argv[2], (err, files) => {
    if (err) { return console.error('Unable to scan directory: ' + err); }
    files.forEach(file => {
        fs.readFile(`${directoryPath}/${file}`, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading the file:', err);
                return;
            }
            if (data.indexOf("<comp>") == -1 && data.indexOf("<import>") == -1) {return;}
            else {
                var tags = data.split(/(>)/);
                for(let i = 0; i < tags.length; i++) {
                    if (tags[i].indexOf("</comp") != -1) {
                        tags[i] = fs.readFileSync(`${directoryPath}/${tags[i].slice(0,-6)}`, 'utf8');
                        tags.splice(i-2, 2)
                        tags.splice(i-1, 1)
                    }
                    if (tags[i].indexOf("</import") != -1) {
                        var isCSS = tags[i].indexOf(".css") != -1 ? true : false;
                        tags[i] = fs.readFileSync(`${directoryPath}/${tags[i].slice(0,-8)}`, 'utf8');
                        tags.splice(i-2, 2)
                        tags.splice(i-1, 1)
                        if (isCSS) { tags[i-2] = `<style>${tags[i-2]}</style>`; }
                        else { tags[i-2] = `<script>${tags[i-2]}</script>`; }
                    }
                }
            }

            fs.access("output", fs.constants.F_OK, (err) => {
                if (err) {
                    fs.mkdir("output", { recursive: true }, (err) => {
                        if (err) {
                            console.error('Error creating directory:', err);
                            return;
                        }
                        writeFile(file,tags);
                    });

                } 
                else { writeFile(file,tags); }
            });
        });
    });
});

function writeFile(file,tags) {
    fs.writeFile(`output/${file}`, tags.join("").replaceAll("\n", ""), (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return;
        }
    });
}
