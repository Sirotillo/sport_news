const Joi = require("joi");

exports.tagValidation = (body) => {
  const schemaTags = Joi.object({
    news_id: Joi.number(),
    tag_id: Joi.number(),
  });
  return schemaTags.validate(body, {
    abortEarly: false,
  });
};
