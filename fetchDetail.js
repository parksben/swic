const fs = require('fs-extra');
const path = require('path');
const requestSequence = require('./requestSequence');
const { task } = require('./config');

const PAGE_LIST = require(task.list.output) || [];

const requestDetail = async () => {
  const urlFieldName = task.detail.url.match(/{{([^}]+)}}/)[1];
  const urlSeq = PAGE_LIST.map(d => ({
    ...d,
    url: task.detail.url.replace(`{{${urlFieldName}}}`, d[urlFieldName]),
    method: task.detail.method || 'GET',
    mergeFunc: (data, url) => ({
      ...url,
      [task.detail.filed]: data,
    }),
  }));

  const result = await requestSequence(
    urlSeq,
    task.detail.concurrent,
    task.detail.dataModifier
  );
  const file = path.resolve(__dirname, task.detail.output || task.list.output);

  fs.ensureFileSync(file);
  fs.writeFileSync(file, JSON.stringify(result, null, 2), 'utf8');

  console.log('\n==> All page fetched.');
};

console.log('==> Fetching detail...\n');
requestDetail();
