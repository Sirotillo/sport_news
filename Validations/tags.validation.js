const Joi = require("joi");

exports.tagValidation = (body) => {
  const schemaTags = Joi.object({
    tag_name: Joi.string(),
    description: Joi.string(),
  });
  return schemaTags.validate(body, {
    abortEarly: false,
  });
};
