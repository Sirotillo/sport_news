const Joi = require("joi");

exports.reportValidation = (body) => {
  const schemaReports = Joi.object({
    user_id: Joi.string(),
    news_id: Joi.string(),
    reason: Joi.string(),
    status: Joi.valid("text", "image", "audio", "video"),
    created_at: Joi.date(),
  });
  return schemaReports.validate(body, {
    abortEarly: false,
  });
};
