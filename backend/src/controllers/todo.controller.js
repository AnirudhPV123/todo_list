import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Todo } from "../models/todos.model.js";
import mongoose from "mongoose";

const addTodo = asyncHandler(async (req, res) => {
  try {
    const { tittle, completed } = req.body;

    if (tittle?.trim() === "") {
      throw new ApiError(400, "title must be required");
    }

    const createTodo = await Todo.create({
      tittle,
      completed,
      ownerId: req.user?._id,
    });
    const todo = await Todo.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(createTodo._id) },
      },
      {
        $project: {
          _id: 1,
          tittle: 1,
          completed: 1,
        },
      },
    ]);

    return res
      .status(200)
      .json(new ApiResponse(200, todo, "Todo added successfully"));
  } catch (error) {
    throw new ApiError(500, "Something went wrong while adding todo");
  }
});

const updateTodo = asyncHandler(async (req, res) => {
  try {
    const { tittle, completed, todoId } = req.body;

    if (!tittle && typeof completed === "undefined") {
      throw new ApiError(400, "Minimum one field must be required");
    }

    if (!todoId || todoId.trim() === "") {
      throw new ApiError(400, "Todo id must be required");
    }

    await Todo.findByIdAndUpdate(todoId, { $set: { tittle, completed } });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Todo updated successfully"));
  } catch (error) {
    throw new ApiError(500, "Something went wrong while updating todo");
  }
});

const deleteTodo = asyncHandler(async (req, res) => {
  try {
    const { todoId } = req.params;

    if (todoId.trim() === "") {
      throw new ApiError(400, "todo id must be required");
    }

    await Todo.findByIdAndDelete(todoId);

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Todo deleted successfully"));
  } catch (error) {
    throw new ApiError(500, "Something went wrong while deleting todo");
  }
});

const getCurrentUserTodos = asyncHandler(async (req, res) => {
  try {
    const todos = await Todo.find({ ownerId: req.user?._id }).select(
      "-ownerId -createdAt -updatedAt"
    );

    console.log(todos);

    return res
      .status(200)
      .json(
        new ApiResponse(200, todos, "Fetch all current user todos successfully")
      );
  } catch (error) {
    throw new ApiError(500, "Something went wrong while fetching all todos");
  }
});

export { addTodo, updateTodo, deleteTodo, getCurrentUserTodos };
