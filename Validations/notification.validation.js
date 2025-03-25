const Joi = require("joi");

exports.notifacationValidation = (body) => {
  const schemaNotifacation = Joi.object({
    user_id: Joi.string(),
    news_id: Joi.string(),
    msg_type: Joi.string().valid("like", "follow"),
    is_checked: Joi.boolean().default(false),
    created_at: Joi.date(),
  });
  return schemaNotifacation.validate(body, {
    abortEarly: false,
  });
};
