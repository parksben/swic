const fs = require('fs-extra');
const path = require('path');
const requestSequence = require('../utils/requestSequence');
const {
  projConf: { task },
  rootDir,
} = require('../utils/config');

const PAGE_LIST =
  require(path.relative(__dirname, path.join(rootDir, task.list.output))) || [];

const requestDetail = async () => {
  const urlFieldName = task.detail.url.match(/{{([^}]+)}}/)[1];
  const urlSeq = PAGE_LIST.map(d => ({
    ...d,
    url: task.detail.url.replace(`{{${urlFieldName}}}`, d[urlFieldName]),
    method: task.detail.method || 'GET',
    mergeFunc: (data, url) => ({
      ...url,
      [task.detail.field]: data,
    }),
  }));

  const result = await requestSequence(
    urlSeq,
    task.detail.concurrent,
    task.detail.dataModifier
  );
  const file = path.resolve(rootDir, task.detail.output || task.list.output);

  fs.ensureFileSync(file);
  fs.writeFileSync(file, JSON.stringify(result, null, 2), 'utf8');

  console.log('\n==> All page fetched.\n');
};

console.log('==> Fetching contents...\n');
requestDetail();
