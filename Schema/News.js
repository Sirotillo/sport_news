const Joi = require("joi");

exports.newsValidation = (body) => {
  const schemaNews = Joi.object({
    news_id: Joi.string(),
    category_id: Joi.string(),
    author_id: Joi.string(),
    status: Joi.string(),
    published_at: Joi.date(),
    source: Joi.string(),
  });
  return schemaNews.validate(body, {
    abortEarly: false,
  });
};
