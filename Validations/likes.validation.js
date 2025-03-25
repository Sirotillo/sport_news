const Joi = require("joi");

exports.likeValidation = (body) => {
  const schemaLikes = Joi.object({
    news_id: Joi.string(),
    user_id: Joi.string(),
    liked_at: Joi.date(),
  });
  return schemaLikes.validate(body, {
    abortEarly: false,
  });
};
