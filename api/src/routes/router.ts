import {Application, Router, Request, Response, NextFunction} from 'express';
import {register, login, forgotPassword, resetPassword} from '../controllers/AuthController';
import {getAllTodos, storeTodo, updateTodo, deleteTodo} from '../controllers/TodosController';
import { show, update } from '../controllers/ProfileController'; 
import {validateLogin, validateRegister, validateForgotPassword,
        validateResetPassword, validateUpdateProfile,
        validateCreateTodo, validateUpdateTodo } from '../validation/index';
import * as passport from 'passport';
import { requireLogin, requireAuth } from '../auth/passport';

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
  
  apiV1Routes
    .get('/', (req: Request, res: Response) => {
      res.status(200).json({message: "api ready..."});
    })
    .get('/profile/:userId', requireAuth, show)
    .patch('/profile/:userId', requireAuth, validateUpdateProfile, update);

  //todos
  apiV1Routes.get('/todos',requireAuth, getAllTodos)
             .post('/todos',requireAuth, validateCreateTodo, storeTodo)
             .patch('/todos/:todoId', requireAuth, validateUpdateTodo,  updateTodo)
             .delete('/todos/:todoId', requireAuth,  deleteTodo);
  

  app.use('/api/v1', apiV1Routes);
  app.use('/api/v1/auth', authRoutes);

  return app;
} 
