const Joi = require("joi");

exports.viewValidation = (body) => {
  const schemaViews = Joi.object({
    news_id: Joi.string(),
    user_id: Joi.string(),
    viewed_at: Joi.date(),
  });
  return schemaViews.validate(body, {
    abortEarly: false,
  });
};
