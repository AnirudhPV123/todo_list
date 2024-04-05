import { Router } from "express";
import {
  addTodo,
  updateTodo,
  deleteTodo,
  getCurrentUserTodos,
} from "../controllers/todo.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// secured routes

router.route("/add").post(verifyJWT,addTodo)
router.route("/update").post(verifyJWT, updateTodo);
router.route("/delete/:todoId").post(verifyJWT, deleteTodo);
router.route("/get-todos").get(verifyJWT, getCurrentUserTodos);




export default router;
