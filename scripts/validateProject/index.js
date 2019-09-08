const validate = require('./validate');
const { projConf } = require('../utils/config');

function validateProject() {
  const { status, message } = validate(projConf);

  if (!status) {
    console.log(message);

    // exit current process with failure if valadate failed
    process.exit(1);
  }

  console.log(message);
  return;
}

validateProject();
