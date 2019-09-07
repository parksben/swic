const fs = require('fs-extra');
const path = require('path');
const dotEnv = require('dotenv');

const ENV_FILE = path.resolve(__dirname, '../../.env');

fs.ensureFileSync(ENV_FILE);
const envConfig = dotEnv.parse(fs.readFileSync(ENV_FILE));

module.exports = require(`../../project/${envConfig.CURRENT_PROJECT}.project.js`);
