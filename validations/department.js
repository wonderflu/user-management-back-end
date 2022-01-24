const Joi = require("joi");

const departmentValidator = (department) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(2).max(50).required(),
    description: Joi.string().min(5).max(250).required(),
  }).unknown();
  return schema.validate(department);
};

module.exports = departmentValidator;
