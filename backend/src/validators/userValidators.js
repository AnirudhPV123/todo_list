import Joi from 'joi';

const email = Joi.string().email().required();
const password = Joi.string()
  .min(6)
  .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).*$/) // regex for uppercase, lowercase, number, and special character
  .required()
  .messages({
    'string.min': 'Password must be at least 6 characters long',
    'string.pattern.base':
      'Password must contain at least one uppercase letter, one number, and one special character',
    'any.required': 'Password is required',
  });

const registerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email,
  password,
});

const loginSchema = Joi.object({
  email,
  password,
});

export { registerSchema, loginSchema };
