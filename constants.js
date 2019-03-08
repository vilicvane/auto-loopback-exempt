const Path = require('path');

const {name, displayName, description} = require('./package');

exports.SERVICE_NAME = name;
exports.SERVICE_DISPLAY_NAME = displayName;
exports.SERVICE_DESCRIPTION = description;

exports.SERVICE_EXECUTABLE = process.argv0;
exports.SERVICE_SCRIPT = Path.join(__dirname, 'main.js');
