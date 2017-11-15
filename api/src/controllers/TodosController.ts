import {Request, Response } from 'express';
import {catchErrors,getErrors,formatError} from '../utils';
import {UnauthorizedError} from '../lib/errors';

const getAllTodos = catchErrors(async (req: Request, res: Response) => {
  const user = req.user;

  if(user.id.toString() !== req.params.userId){
    throw new UnauthorizedError();
  }
 

  res.status(200);
});

export {
  getAllTodos
}