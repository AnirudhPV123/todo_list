import { asyncHandler } from '../utils/asyncHandler.js';
import { CustomError } from '../utils/CustomError.js';
import { CustomResponse } from '../utils/CustomResponse.js';
import { Todo } from '../models/todos.model.js';
import { addTodoSchema, updateTodoSchema } from '../validators/todoValidators.js';

// Add a new todo
const addTodo = asyncHandler(async (req, res) => {
  const { _id: userId } = req.user;
  const {
    error,
    value: { title, completed },
  } = addTodoSchema.validate(req.body);

  if (error) {
    throw new CustomError(400, error.details[0].message);
  }

  const todo = await Todo.create({ userId, title, completed });

  return res.status(201).json(new CustomResponse(201, todo, 'Todo added successfully.'));
});

// Retrieve all todos for the user
const getTodo = asyncHandler(async (req, res) => {
  const { _id: userId } = req.user;

  const todos = await Todo.find({ userId });

  return res.status(200).json(new CustomResponse(200, todos, 'Todos fetched successfully.'));
});

// Update a specific todo
const updateTodo = asyncHandler(async (req, res) => {
  const {
    error,
    value: { todoId, title, completed },
  } = updateTodoSchema.validate(req.body);

  if (error) {
    throw new CustomError(400, error.details[0].message);
  }

  const updatedTodo = await Todo.findByIdAndUpdate(todoId, { title, completed }, { new: true });

  return res.status(200).json(new CustomResponse(200, updatedTodo, 'Todo updated successfully.'));
});

export { addTodo, getTodo, updateTodo };
