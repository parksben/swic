const fs = require('fs-extra');
const path = require('path');
const { rootDir } = require('../utils/config');
const updateEnv = require('../utils/updateEnv');

const PROJECT_LIST = fs
  .readdirSync(path.resolve(rootDir, './project'))
  .map(x => x.replace('.project.js', ''));

function checkoutProject(projectName) {
  if (!projectName) {
    console.log(
      '\nFailed to use project, please use with project name\n\nFor example:\n\n    npm run use-project <my-project-name>\n'
    );
    return;
  }

  if (!PROJECT_LIST.includes(projectName)) {
    console.log(
      `\nThe project named \`${projectName}\` not found.\n\nAll current options are:\n\n${PROJECT_LIST.map(
        name => `  \`${name}\``
      ).join('\n')}\n`
    );
    return;
  }

  updateEnv({ CURRENT_PROJECT: projectName });
  console.log(
    `\nNow using config file \`./project/${projectName}.project.js\`.\n`
  );
  return;
}

const [PROJECT_NAME] = process.argv.slice(2);
checkoutProject(PROJECT_NAME);
