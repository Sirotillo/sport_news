const Joi = require("joi");

exports.languageValidation = (body) => {
  const schemaLanguages = Joi.object({
    _name: Joi.string()
      .min(3)
      .message("Ism 3ta dan kam bomasin")
      .max(30)
      .message("Ism 30ta dan oshiq bomasin")
      .required()
      .messages({
        "string.empty": "So'z bo'sh bo'lishi mumkin emas",
        "any.required": "So'zni kiriting",
      }),
    code: Joi.string().default("uz"),
  });
  return schemaLanguages.validate(body, {
    abortEarly: false,
  });
};
