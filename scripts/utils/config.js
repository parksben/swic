const fs = require('fs-extra');
const path = require('path');

/**
 * export project, rootDir
 */

const dotEnv = require('dotenv');

const ENV_FILE = path.resolve(__dirname, '../../.env');

fs.ensureFileSync(ENV_FILE);
const envConfig = dotEnv.parse(fs.readFileSync(ENV_FILE));

exports.project = envConfig.CURRENT_PROJECT;
exports.rootDir = path.join(__dirname, '../../');

/**
 * export projConf
 */

const validate = require('../validateProject/validate');

const projFile = path.resolve(
  __dirname,
  `../../project/${envConfig.CURRENT_PROJECT}.project.js`
);
const projFileExists = fs.existsSync(projFile);
const projConf = projFileExists ? require(projFile) : {};

const { status, message, value } = validate(projConf);
exports.projConf = value;

if (!status) {
  console.log(message);

  // exit current process with failure if valadate failed
  process.exit(1);
}
