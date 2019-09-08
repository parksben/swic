const fs = require('fs-extra');
const path = require('path');
const { project, rootDir } = require('../utils/config');

const PROJECT_LIST = fs
  .readdirSync(path.resolve(rootDir, './project'))
  .map(x => x.replace('.project.js', ''));

function listProjectNames() {
  console.log(
    `\n${PROJECT_LIST.map(name =>
      name === project ? `  * ${name}` : `    ${name}`
    ).join('\n')}\n`
  );
  return;
}

listProjectNames();
