import { asyncHandler } from "../utils/asyncHandler.js";
import { CustomError } from "../utils/CustomError.js";
import { CustomResponse } from "../utils/CustomResponse.js";
import { Todo } from "../models/todos.model.js";
import mongoose from "mongoose";

const addTodo = asyncHandler(async (req, res) => {
  console.log("its here")
  try {
    await Todo.deleteMany({ ownerId: req.user._id });

    const todos = req.body.map((todo) => ({ ...todo, ownerId: req.user._id }));

    await Todo.insertMany(todos);

    return res
      .status(200)
      .json(new CustomResponse(200, todo, "Todo added successfully"));
  } catch (error) {
    throw new CustomError(500, "Something went wrong while adding todo"); 
  }
});

const getCurrentUserTodos = asyncHandler(async (req, res) => {
  console.log("here coming");
  try {
    const todos = await Todo.find({ ownerId: req.user?._id }).select(
      "-ownerId -createdAt -updatedAt"
    );

    console.log("here");
    console.log(todos);

    return res
      .status(200)
      .json(
        new CustomResponse(200, todos, "Fetch all current user todos successfully")
      );
  } catch (error) {
    throw new CustomError(500, "Something went wrong while fetching all todos");
  }
});

export { addTodo, getCurrentUserTodos };
