const requestPage = require('./requestPage');

const _chunk = (seq = [], size = 10) => {
  let lists = [];
  for (let i = 0; i < Math.ceil(seq.length / size); i++) {
    lists.push(seq.slice(i * size, (i + 1) * size));
  }
  return lists;
};

const requstConcurrent = async (urlList = [], dataModifier = d => d) => {
  const promises = urlList.map(url => requestPage(url, dataModifier));
  const listChunks = await Promise.all(promises);
  return listChunks;
};

const requestSequence = async (sequence, size = 10, dataModifier) => {
  const result = [];
  const queue = _chunk(sequence, size);

  return new Promise(resolve => {
    const total = queue.length;
    let current = 1;

    const execQueue = async () => {
      if (queue.length > 0) {
        const urlList = queue.shift();

        try {
          const dataList = await requstConcurrent(urlList, dataModifier);
          result.push(...dataList);
          console.log(`succeed -> ${current}/${total}`);
        } catch (e) {
          console.log(`failed -> ${current}/${total}`);
        }
        current += 1;

        await execQueue();
      } else {
        resolve(result);
      }
    };

    execQueue();
  });
};

module.exports = requestSequence;
