import Joi from 'joi';

const title = Joi.string().required();
const completed = Joi.boolean().required();

const addTodoSchema = Joi.object({
  title,
  completed,
});

const updateTodoSchema = Joi.object({
  title,
  completed,
  todoId: Joi.string().required(),
});

export { addTodoSchema, updateTodoSchema };
