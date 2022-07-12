const fs = require('fs');
const merge = require('deepmerge');
const yaml = require('js-yaml');

const entries = fs.readdirSync('./zh_tw/').map(file => {
    const filePath = `./zh_tw/${file}`;
    if (file.endsWith('.yml')) {
        return yaml.load(fs.readFileSync(filePath, 'utf8'));
    } else if (file.endsWith('.json')) {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } else return {};
});

const results = merge.all(entries);
fs.writeFileSync(`./zh-tw.json`, JSON.stringify(results));
