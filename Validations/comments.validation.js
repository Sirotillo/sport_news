const Joi = require("joi");

exports.commentValidation = (body) => {
  const schemaComments = Joi.object({
    user_id: Joi.string(),
    news_id: Joi.string(),
    content: Joi.string(),
    created_at: Joi.date(),
    reply_comment_id: Joi.number(),
    is_approved: Joi.boolean(),
    is_deleted: Joi.boolean(),
    views: Joi.number(),
    likes: Joi.number(),
  });
  return schemaComments.validate(body, {
    abortEarly: false,
  });
};
