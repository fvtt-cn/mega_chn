const fs = require('fs');
const merge = require('deepmerge')

const entries = fs.readdirSync('./chinese/').map(file => {
    if (file.endsWith('.json')) {
        return JSON.parse(fs.readFileSync(file, 'utf8'));
    } else return {};
});

const results = merge.all(entries);
fs.writeFileSync(`./cn.json`, JSON.stringify(results));