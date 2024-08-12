import Joi from 'joi';

const registerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(6)
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).*$/) // regex for uppercase, lowercase, number, and special character
    .required()
    .messages({
      'string.min': 'Password must be at least 6 characters long',
      'string.pattern.base':
        'Password must contain at least one uppercase letter, one number, and one special character',
      'any.required': 'Password is required',
    }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(6)
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).*$/) // regex for uppercase, lowercase, number, and special character
    .required()
    .messages({
      'string.min': 'Password must be at least 6 characters long',
      'string.pattern.base':
        'Password must contain at least one uppercase letter, one number, and one special character',
      'any.required': 'Password is required',
    }),
});

export { registerSchema, loginSchema };
