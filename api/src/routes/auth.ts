
import { Router } from 'express';
import { login, register, forgotPassword,requireLogin, verifyToken, roleAuthorization, meFromToken } from '../controllers/AuthController';

const router: Router = Router();

router
      .post('/register', register)
      .post('/login', requireLogin, login)
      .post('/forgot-password', forgotPassword)
      .post('/reset-password/:token', verifyToken)
      .post('/me-from-token', meFromToken);

export default router;