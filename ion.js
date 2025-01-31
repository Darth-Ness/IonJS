const fs = require('fs');

var directoryPath = process.argv[2];
fs.readdir(directoryPath, (err, files) => {
    if (err) {
        return console.error('Unable to scan directory: ' + err);
    }
    files.forEach(file => {
        console.log(file)
        fs.readFile(`${directoryPath}/${file}`, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading the file:', err);
                return;
            }
            if (data.indexOf("<comp>") == -1) {return;}
            else {
                var tags = data.split(/(>)/);
                for(let i = 0; i < tags.length; i++) {
                    if (tags[i].indexOf("</comp") != -1) {
                        
                        tags[i] = fs.readFileSync(`${directoryPath}/${tags[i].slice(0,-6)}`, 'utf8');
                        tags.splice(i-1, 1)
                        tags.splice(i-2, 1)
                        tags.splice(i-1, 1)
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
                else {
                    writeFile(file,tags);
                }
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

