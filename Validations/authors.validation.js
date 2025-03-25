const Joi = require("joi");

exports.authorValidation = (body) => {
  const schemaAuthors = Joi.object({
    user_id: Joi.string(),
    is_approved: Joi.boolean().default(false),
    is_editor: Joi.boolean().default(false),
  });
  return schemaAuthors.validate(body, {
    abortEarly: false,
  });
};
