
import { Router } from 'express';
import { login, register, forgotPassword,requireLogin, verifyToken, roleAuthorization } from '../controllers/AuthController';

const router: Router = Router();

router
      .post('/register', register)
      .post('/login', requireLogin, login)
      .post('/forgot-password', forgotPassword)
      .post('/reset-password/:token', verifyToken);

export default router;