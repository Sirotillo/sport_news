const Joi = require("joi");

exports.mediaValidation = (body) => {
  const schemaMedia = Joi.object({
    news_id: Joi.number(),
    media_type: Joi.valid("text", "image", "audio", "video"),
    media_url: Joi.string(),
    uploaded_at: Joi.date().default(Date.now()),
  });
  return schemaMedia.validate(body, {
    abortEarly: false,
  });
};
