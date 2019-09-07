require('dotenv').config();

module.exports = require(`./${process.env.CRAWLER_TARGET}.config.js`);
