import {Application, Router, Request, Response, NextFunction} from 'express';
import {register, login, forgotPassword, resetPassword} from '../controllers/AuthController'; 
import { getErrors, catchErrors } from '../utils';
import {validateLogin, validateRegister, validateForgotPassword, validateResetPassword } from '../validation/index';
import * as passport from 'passport';
import { requireLogin } from '../auth/passport';

module.exports = (app: Application) => {

  /*** AUTH ***/
    const authRoutes: Router = Router();

    // authRoutes
    authRoutes.post('/register', validateRegister, register)
              .post('/login', validateLogin, requireLogin, login)
              .post('/forgot-password', validateForgotPassword, forgotPassword)
              .post('/reset-password', validateResetPassword, resetPassword);

  /*** API ***/
    /*** V1 ***/
    const apiV1Routes: Router = Router();
    
    apiV1Routes.get('/', (req: Request, res: Response) => {
      res.status(200).json({message: "api ready..."});
    });

  app.use('/api/v1', apiV1Routes);
  app.use('/auth', authRoutes);
  return app;
} 
