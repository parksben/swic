const fs = require('fs-extra');
const path = require('path');
const requestSequence = require('./requestSequence');
const { task } = require('./config');

const requestPageRange = async (start = 1, end = 10) => {
  const urlSeq = [];
  for (let i = start; i <= end; i++) {
    urlSeq.push({
      method: task.list.method || 'GET',
      url: task.list.url.replace(/{{pn}}/g, i),
    });
  }

  const result = await requestSequence(
    urlSeq,
    task.list.concurrent,
    task.list.dataModifier
  );
  const resultList = result.reduce((pre, cur) => pre.concat(cur));
  const file = path.resolve(__dirname, task.list.output);

  fs.ensureFileSync(file);
  fs.writeFileSync(file, JSON.stringify(resultList, null, 2), 'utf8');

  console.log('\n==> All list fetched.');
};

console.log('==> Fetching content list...\n');
requestPageRange(...task.list.range);
