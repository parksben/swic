const fs = require('fs-extra');
const path = require('path');
const dotEnv = require('dotenv');

const ENV_FILE = path.resolve(__dirname, '../../.env');

fs.ensureFileSync(ENV_FILE);
const envConfig = dotEnv.parse(fs.readFileSync(ENV_FILE));

exports.project = envConfig.CURRENT_PROJECT;

const projFile = `../../project/${envConfig.CURRENT_PROJECT}.project.js`;
const projFileExists = fs.existsSync(projFile);
exports.env = projFileExists ? require(projFile) : {};

exports.rootDir = path.join(__dirname, '../../');
