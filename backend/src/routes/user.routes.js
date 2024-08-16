import { Router } from 'express';
import {
  userRegister,
  userLogin,
  userLogout,
  refreshAccessToken,
} from '../controllers/user.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/sign-up').post(userRegister);
router.route('/login').post(userLogin);
router.route('/refresh-token').post(refreshAccessToken);

// secured routes
router.route('/logout').post(verifyJWT, userLogout);

export default router;
