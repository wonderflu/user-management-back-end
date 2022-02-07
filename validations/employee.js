const Joi = require("joi");
const CustomHTTPError = require("../errors");

module.exports.employeeValidator = (request, response, next) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(15).required(),
    email: Joi.string()
      .min(5)
      .max(30)
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    firstName: Joi.string()
      .regex(/^[a-z\d\-_\s]+$/i)
      .min(1)
      .max(20)
      .required(),
    lastName: Joi.string()
      .regex(/^[a-z\d\-_\s]+$/i)
      .min(1)
      .max(20)
      .required(),
    department: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
  }).unknown();
  const { error } = schema.validate(request.body);
  if (error) {
    throw CustomHTTPError.BadRequest(error.details[0].message);
  }
  next();
};

module.exports.employeeValidatorPatch = (request, response, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .min(5)
      .max(30)
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .optional(),
    firstName: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .min(1)
      .max(20)
      .optional(),
    lastName: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .min(1)
      .max(20)
      .optional(),
  }).unknown();
  const { error } = schema.validate(request.body);
  if (error) {
    throw CustomHTTPError.BadRequest(error.details[0].message);
  }
  next();
};
