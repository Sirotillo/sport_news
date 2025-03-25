const Joi = require("joi");

exports.newsWithLangsValidation = (body) => {
  const schemaNewsWithLangs = Joi.object({
    title: Joi.string(),
    content: Joi.string(),
    sumary_news: Joi.string(),
    lang_id: Joi.string(),
  });
  return schemaNewsWithLangs.validate(body, {
    abortEarly: false,
  });
};
