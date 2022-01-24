const Joi = require("joi");

const employeeValidator = (employee) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(15).required(),
    email: Joi.string()
      .min(5)
      .max(30)
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    first_name: Joi.string().alphanum().min(1).max(20).required(),
    last_name: Joi.string().alphanum().min(1).max(20).required(),
    department: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
  }).unknown();
  return schema.validate(employee);
};

module.exports = employeeValidator;
