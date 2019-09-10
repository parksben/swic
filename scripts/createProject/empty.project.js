/**
 * This is a empty project config file to startup your own collector.
 * Refer to [Swic Homepage](https://github.com/parksben/swic) to learn about following codes.
 */

module.exports = {
  axios: {
    baseURL: 'http://something.domain/',
    timeout: 3000,
    headers: {},
  },

  task: {
    list: {
      url: 'list/{{pn}}',
      range: [1, 10],
      dataModifier: list => list,
    },

    detail: {
      url: 'detail/{{id}}',
      dataModifier: content => content,
    },
  },
};
