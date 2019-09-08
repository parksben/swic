const Joi = require('@hapi/joi');
const schema = require('./schema');

const formatErrorTip = error =>
  '\n' +
  error.name +
  ':\n\n  ' +
  error.details
    .map(
      ({ message, path }) =>
        '`project.' +
        path
          .map(x => (/^\d+$/.test(x) ? `[${x}]` : x))
          .join('.')
          .replace(/\.(\[\d+\])/g, '$1') +
        '`' +
        message.replace(/^"[^"]+"/, '')
    )
    .join('\n  ') +
  '\n\nPlease check if your project config is correct.\n';

function validate(config) {
  const result = Joi.validate(config, schema);

  return {
    status: !result.error,
    message: result.error
      ? formatErrorTip(result.error)
      : '\n=> Project file validate passed.\n',
    value: result.value,
  };
}

module.exports = validate;
