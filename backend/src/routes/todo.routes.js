import { Router } from "express";
import {
  addTodo,
  getCurrentUserTodos,
} from "../controllers/todo.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// secured routes

router.route("/add").post(verifyJWT,addTodo)
router.route("/get").get(verifyJWT, getCurrentUserTodos);




export default router;
