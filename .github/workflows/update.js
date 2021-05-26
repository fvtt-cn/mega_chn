const request = require('request');
const fs = require('fs');

const download = (url, dest, cb) => {
    const file = fs.createWriteStream(dest);
    const sendReq = request.get(url);

    // verify response code
    sendReq.on('response', (response) => {
        if (response.statusCode !== 200) {
            return cb('Response status was ' + response.statusCode);
        }

        sendReq.pipe(file);
    });

    // close() is async, call cb after close completes
    file.on('finish', () => file.close(cb));

    // check for request errors
    sendReq.on('error', (err) => {
        fs.unlink(dest);
        return cb(err.message);
    });

    file.on('error', (err) => { // Handle errors
        fs.unlink(dest); // Delete the file async. (But we don't check the result)
        return cb(err.message);
    });
};

const projects = JSON.parse(fs.readFileSync('./projects.json', 'utf8'));
for (let project of projects) {
    download(project.src, `./english/${project.name}.json`, () => { });

    if (!fs.existsSync(`./chinese/${project.name}.json`)) {
        fs.closeSync(fs.openSync(`./chinese/${project.name}.json`, 'w'))
    }
}