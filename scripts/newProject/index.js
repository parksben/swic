const fs = require('fs-extra');
const path = require('path');

function copyEmptyProject(projectName) {
  if (projectName) {
    const emptyFile = fs.readFileSync(
      path.resolve(__dirname, './empty.project.js'),
      'utf-8'
    );
    const outputFile = path.resolve(
      __dirname,
      `../../project/${projectName}.project.js`
    );

    fs.ensureFileSync(outputFile);
    fs.writeFileSync(outputFile, emptyFile, 'utf8');

    console.log(
      `\nProject config file \`./project/${projectName}.project.js\` created.\n`
    );
    return;
  }

  console.log(
    '\nFailed to create project, please create with project name\n\nFor example:\n\n    npm run create-project <my-project-name>\n'
  );
  return;
}

const [PROJECT_NAME] = process.argv.slice(2);
copyEmptyProject(PROJECT_NAME);
