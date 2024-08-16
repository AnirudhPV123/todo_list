import { Router } from 'express';
import { addTodo, deleteTodo, getTodo, updateTodo } from '../controllers/todo.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/').get(verifyJWT, getTodo);
router.route('/').post(verifyJWT, addTodo);
router.route('/:id').put(verifyJWT, updateTodo);
router.route('/:id').delete(verifyJWT,deleteTodo)

export default router;
