import {Application, Router, Request, Response, NextFunction} from 'express';
import {register, login} from '../controllers/AuthController'; 
import { getErrors, catchErrors } from '../utils';
// import validateRegister from '../validation/validateRegister';
// import validateLogin from '../validation/validateLogin';
import * as passport from 'passport';
import { requireLogin } from '../auth/passport';

module.exports = (app: Application) => {

  /*** AUTH ***/
    const authRoutes: Router = Router();

    // authRoutes
    authRoutes.post('/register', register)
              .post('/login', requireLogin, login)
    //   .post('forgot-password', forgotPassword)
    //   .post('reset-password/:token', verifyToken)
    //   .post('me-from-token', meFromToken);

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
