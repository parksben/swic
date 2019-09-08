const axios = require('axios');
const { env } = require('./config');

const instance = axios.create(env.axios);

const requestPage = async (url, dataModifier = d => d) => {
  let requestMethod = 'get';
  if (url && url.method) {
    requestMethod = url.method.toLowerCase();
  }

  let requestUrl = url;
  if (url && url.url) {
    requestUrl = url.url;
  }

  let { data } = await instance[requestMethod](requestUrl);
  data = dataModifier(data);

  if (url && url.mergeFunc) {
    data = url.mergeFunc(data, url);
  }

  return data;
};

module.exports = requestPage;
