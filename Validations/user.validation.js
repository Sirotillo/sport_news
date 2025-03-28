const Joi = require("joi");

exports.userValidation = (body) => {
  const schemaUsers = Joi.object({
    first_name: Joi.string(),
    last_name: Joi.string(),
    email: Joi.email(),
    password: Joi.string().min(6).message("6ta dan kam bolmasin"),
    role: Joi.string().valid("admin", "user"),
    is_active: Joi.boolean(),
    created_at: Joi.date(),
    interests: Joi.number(),
    phone_number: Joi.string(),
  });
  return schemaUsers.validate(body, {
    abortEarly: false,
  });
};
