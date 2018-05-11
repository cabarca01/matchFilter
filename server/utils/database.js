'use strict';

const fs = require('fs');
const path = require('path');

const loadDataFromJSONFile = (filename) => {
    try {
        let data = fs.readFileSync(path.resolve(__dirname, `../../database/${filename}`));
        return JSON.parse(data);
    } catch (e) {
        throw new Error('Could not load and parse ' + filename);
    }
};

module.exports = {
    loadDataFromJSONFile
};
