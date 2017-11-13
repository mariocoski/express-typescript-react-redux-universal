import {Request, Response } from 'express';
import {catchErrors,getErrors,formatError} from '../utils';

const getAllTodos = catchErrors(async (req: Request, res: Response) => {

 

  res.status(200);
});

export {
  getAllTodos
}