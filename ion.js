const fs = require('fs');

fs.readFile('index.html', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }
    if (data.indexOf("<comp>") == -1) {return;}
    else {
        var tags = data.split(/(>)/);
        for(let i = 0; i < tags.length; i++) {
            if (tags[i].indexOf("</comp") != -1) {
                
                tags[i] = fs.readFileSync(`${tags[i].slice(0,-6)}`, 'utf8');
                tags.splice(i-1, 1)
                tags.splice(i-2, 1)
                tags.splice(i-1, 1)
            }
        }
    }
    fs.writeFile('output.html', tags.join("").replaceAll("\n", ""), (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return;
        }
    });
});

