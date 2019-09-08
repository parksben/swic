const fs = require('fs-extra');
const path = require('path');
const dotEnv = require('dotenv');
const { rootDir } = require('../utils/config');

const ENV_FILE = path.resolve(rootDir, './.env');

module.exports = keyVal => {
  fs.ensureFileSync(ENV_FILE);

  const plainText = Object.entries({
    ...dotEnv.parse(fs.readFileSync(ENV_FILE)),
    ...keyVal,
  }).reduce((text, [key, value]) => text + `${key}=${value}\n`, '');

  fs.writeFileSync(ENV_FILE, plainText, 'utf-8');
};
