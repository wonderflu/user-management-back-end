const Joi = require("joi");
const CustomHTTPError = require("../errors");

module.exports.userValidator = (request, response, next) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(15).required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  }).unknown();
  const { error } = schema.validate(request.body);
  if (error) {
    throw CustomHTTPError.BadRequest(error.details[0].message);
  }
  next();
};
