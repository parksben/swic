/**
 * This is a demo of project file to startup your own collector
 * This demo is used to collect blogs from http://www.chanpin100.com/
 */

// Parsing html plain text by using `cheerio`.
const cheerio = require('cheerio');

// Use some utility functions in the handler directory.
const utf8ToWord = require('../handlers/utf8ToWord');

// This `[name].project.js` module exports an object consisting of a series of properties finally.
module.exports = {
  // Parameters of `axios` which the collector request defferent urls by using it,
  // refer to the homepage of `cheerio` for detail: https://github.com/cheeriojs/cheerio
  axios: {
    baseURL: 'http://www.chanpin100.com/',
    timeout: 3000,
    headers: {
      Accept: '*/*',
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
      Connection: 'keep-alive',
      Cookie:
        'ADHOC_MEMBERSHIP_CLIENT_ID1.0=c686b5e7-831e-fdfe-2014-5ecf184d8d0f; gr_user_id=035caa40-b134-47d1-92dc-f493a4ea9e62; uc_checked=true; __abtester_visitor=854674415; __abtester_segments=; __abtester_project=734; grwng_uid=d8cc581d-f7b3-4197-8e9b-0e007a35950e; Hm_lvt_a9d99fcc568adb26accffed9f7374966=1563598730; zg_did=%7B%22did%22%3A%20%2216c0dbf31c6dde-026544af754281-37627c05-13c680-16c0dbf31c787b%22%7D; LXB_REFER=www.baidu.com; Hm_lvt_8c8e40b512af88adace9b073f3b64b94=1563598762; redirect=%2F; popStartTime=1563678788791; a4ca1cc3d771ccd5_gr_session_id=35070f2a-0bc0-40fd-8c90-c34b857812fd; a4ca1cc3d771ccd5_gr_session_id_35070f2a-0bc0-40fd-8c90-c34b857812fd=true; Hm_lpvt_a9d99fcc568adb26accffed9f7374966=1563699662; Hm_lpvt_8c8e40b512af88adace9b073f3b64b94=1563699662; pt_s_58ffeee8=vt=1563699661736&cad=; zg_d4d568592c154a2bae08a52b53d602ea=%7B%22sid%22%3A%201563697191.703%2C%22updated%22%3A%201563699661.779%2C%22info%22%3A%201563598729681%7D; responseTimeline=96; pt_58ffeee8=uid=QPnC2XGDEzeiLoRJRZAfPA&nid=0&vid=bzcMLehFHjzO4XBg3yrMjA&vn=15&pvn=1&sact=1563700124704&to_flag=0&pl=qUOTUTVkPPI88eEMM3tmbg*pt*1563700121661',
      Host: 'www.chanpin100.com',
      'If-None-Match': 'W/"3b2d-UfpbQXGPbk6DKrC6jHgOxQ"',
      Referer: 'http://www.chanpin100.com/pm',
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36',
      'X-Requested-With': 'XMLHttpRequest',
    },
  },

  // The params following are required by your collector before running:
  task: {
    // Config for fetching the "list-like" pages (or data interfaces):
    list: {
      // The url style of "list-like" page (or data interfaces),
      // which accepts one string or object (for example: { url: 'article/{{id}}', method: 'POST' })
      // { url: '/list?page={{pn}}', method: 'POST' }
      // [Notes] The `{{pn}}` in url string indicates the page number.
      url: 'pm/list?page={{pn}}',

      // The page range for the "list-like" pages to collect,
      // which accepts an array of two numbers.
      range: [1, 10],

      // The number of concurrent requests which determines the execution speed of the collection task.
      concurrent: 50,

      // A pure function that modifies the response of a single request to the format you need.
      // [Notes] The result must return an array which is used to request a list of the "content-like" pages (or data interfaces).
      dataModifier: ({ data: { list = [] } }) => list,

      // The output path of the data collections (only supports json format currently).
      output: './output/chanpin100/list.json',
    },

    // Config for fetching the "content-like" pages (or data interfaces):
    detail: {
      // The url style for "content-like" pages (or data interfaces),
      // which accepts one string or object (for example: { url: 'article/{{id}}', method: 'POST' })
      // [Notes] All mustache-style variable names come from the fields of the data which the parameter `task.list.output` refers to.
      url: 'article/{{id}}',

      // The number of concurrent requests which determines the execution speed of the collection task.
      concurrent: 10,

      // A pure function that modifies the response of a single request to the format you need.
      dataModifier: html => {
        const $ = cheerio.load(html);
        const introduce = $('.introduce').html();
        const content = $('.article-content-container').html();
        return utf8ToWord(
          `<div class="introduce">${introduce}</div>\n<div class="content">${content}</div>`
        );
      },

      // The field name in output file for the result `detail.dataModifier` returns.
      filed: 'content_html',

      // The output path of the data collections (only supports json format currently).
      output: './output/chanpin100/result.json',
    },
  },
};
