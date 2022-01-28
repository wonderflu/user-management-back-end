const Joi = require("joi");
const CustomHTTPError = require("../errors");

module.exports.departmentValidator = (request, response, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(2).max(50).required(),
    description: Joi.string().min(5).max(250).required(),
  }).unknown();
  const { error } = schema.validate(request.body);
  if (error) {
    throw CustomHTTPError.BadRequest(error.details[0].message);
  }
  next();
};

module.exports.departmentValidatorPatch = (request, response, next) => {
  const schema = Joi.object({
    description: Joi.string().min(5).max(250).required(),
  }).unknown();
  const { error } = schema.validate(request.body);
  if (error) {
    throw CustomHTTPError.BadRequest(error.details[0].message);
  }
  next();
};
