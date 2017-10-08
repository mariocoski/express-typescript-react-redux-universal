import {Application, Router, Request, Response} from 'express';
import {register} from '../controllers/AuthController'; 

import validateRegister from '../validation/validateRegister';

module.exports = (app: Application) => {

  /*** AUTH ***/
    const authRoutes: Router = Router();

    // authRoutes
    authRoutes.post('/register', validateRegister, register);
        
    // authRoutes.post('/register', validateRegister, register);
    //   .post('login', requireLogin, login)
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
