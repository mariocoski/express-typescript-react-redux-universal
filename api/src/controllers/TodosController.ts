import {Request, Response } from 'express';
import {catchErrors,getErrors,formatError} from '../utils';
import {UnauthorizedError} from '../lib/errors';
import {getTodosForUserId} from '../repositories/todoRepo';

const getAllTodos = catchErrors(async (req: Request, res: Response) => {

  const todos = await getTodosForUserId(req.user.id.toString());

  res.status(200).json({ data: todos });
});

export {
  getAllTodos
}