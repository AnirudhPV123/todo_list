import { Router } from 'express';
import { addTodo, getTodo, updateTodo } from '../controllers/todo.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/').get(verifyJWT, getTodo);
router.route('/').post(verifyJWT, addTodo);
router.route('/').put(verifyJWT, updateTodo);

export default router;
