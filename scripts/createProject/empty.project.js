/**
 * This is a empty project config file to startup your own collector.
 * Refer to [Swic Homepage](https://github.com/parksben/swic) to learn about following codes.
 */

// Parsing html plain text by using `cheerio`.
// const cheerio = require('cheerio');

// Use some utility functions in the handler directory.
// const utf8ToWord = require('../handlers/utf8ToWord');

module.exports = {
  axios: {
    baseURL: 'http://something.domain/',
    timeout: 3000,
    headers: {},
  },

  task: {
    list: {
      url: { url: 'list/{{pn}}', method: 'GET' },
      range: [1, 10],
      concurrent: 50,
      dataModifier: list => list,
      output: './output/list.json',
    },

    detail: {
      url: { url: 'detail/{{id}}', method: 'GET' },
      concurrent: 10,
      dataModifier: content => content,
      filed: 'content_field_name',
      output: './output/detail.json',
    },
  },
};
