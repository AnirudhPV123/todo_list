import Joi from 'joi';

const title = Joi.string();
const completed = Joi.boolean();

const addTodoValidatorSchema = Joi.object({
  title: title.required(),
  completed: completed.required(),
});

const updateTodoValidatorSchema = Joi.object({
  // Validate that at least one of the following fields is present
  title: title.optional(),
  completed: completed.optional(),
}).or('title', 'completed');

export { addTodoValidatorSchema,updateTodoValidatorSchema };
