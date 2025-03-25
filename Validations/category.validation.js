const Joi = require("joi");

exports.categoryValidation = (body) => {
  const schemaCategorys = Joi.object({
    category_name: Joi.string(),
    description: Joi.string(),
    parent_id: Joi.email(),
  });
  return schemaCategorys.validate(body, {
    abortEarly: false,
  });
};
