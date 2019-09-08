const Joi = require('@hapi/joi');

const VALID_HTTP_METHODS = [
  'GET',
  'HEAD',
  'POST',
  'PUT',
  'DELETE',
  'CONNECT',
  'OPTIONS',
  'TRACE',
  'PATCH',
];

module.exports = Joi.object().keys({
  axios: Joi.object({
    baseURL: Joi.string()
      .regex(/^https?\:\/\/.+/)
      .required(),

    timeout: Joi.number()
      .min(0)
      .integer()
      .default(3000),
  })
    .unknown()
    .required(),

  task: Joi.object({
    // schema for list config
    list: Joi.object({
      url: Joi.string()
        .regex(/{{pn}}/)
        .required(),

      method: Joi.string()
        .valid(...VALID_HTTP_METHODS)
        .default('GET'),

      range: Joi.array()
        .items(
          Joi.number()
            .min(0)
            .integer()
        )
        .length(2)
        .default([1, 10]),

      concurrent: Joi.number()
        .min(1)
        .integer()
        .default(10),

      dataModifier: Joi.func().required(),

      output: Joi.string().default('./output/list.json'),
    }).required(),

    // schema for detail config
    detail: Joi.object({
      url: Joi.string().required(),

      method: Joi.string()
        .valid(...VALID_HTTP_METHODS)
        .default('GET'),

      concurrent: Joi.number()
        .min(1)
        .integer()
        .default(10),

      dataModifier: Joi.func().required(),

      field: Joi.string().default('content'),

      output: Joi.string().default('./output/detail.json'),
    }).required(),
  }).required(),
});
