const Joi = require('joi');
const status = require('http-status');

const validate = (schema) => (req, res, next) => {
  const object = req.body;

  console.log(object);
  const { value, error } = Joi.compile(schema.body)
    .prefs({ errors: { label: 'key' } })
    .validate(object);

  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(', ');
    console.log(errorMessage);
    return next(JSON.stringify({ code: status.BAD_REQUEST, errorMessage }));
  }
  Object.assign(req, value);
  return next();
};

module.exports = validate;
