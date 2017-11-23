import {Request, Response } from 'express';
import {catchErrors,getErrors,formatError} from '../utils';
import {UnauthorizedError, ForbiddenError, NotFoundError} from '../lib/errors';
import {getTodosForUserId, getTodoById, createTodo, 
        updateTodoById, deleteTodoById } from '../repositories/todoRepo';
import * as filter from 'express-validator/filter';

const getAllTodos = catchErrors(async (req: Request, res: Response) => {

  const todos = await getTodosForUserId(req.user.id.toString());

  res.status(200).json({ data: todos });
});

const storeTodo = catchErrors(async (req: Request, res: Response) => {

  const errors = getErrors(req);

  if(!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }
  const data: any = { 
    ...filter.matchedData(req), 
    user_id: req.user.id, 
    completed_at: null, 
    deleted_at: null
  };

  await createTodo(data);
  
  res.status(201).json({ created: true });
});

const updateTodo = catchErrors(async (req: Request, res: Response) => {

  const errors = getErrors(req);
  
  if(!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }
  
  const data: any = filter.matchedData(req);
  
  const todoId = req.params.todoId;

  const todo = await getTodoById(todoId);

  if(todo.user_id !== req.user.id){
    throw new ForbiddenError();
  }

  await updateTodoById(todoId, data);

  res.status(200).json({ updated: true });
});

const deleteTodo = catchErrors(async (req: Request, res: Response) => {

  const todoId = req.params.todoId;

  const todo = await getTodoById(todoId);

  if(! todo){
    throw new NotFoundError();
  }

  if(todo.user_id !== req.user.id){
    throw new ForbiddenError();
  }
  
  await deleteTodoById(todoId);

  res.status(200).json({ deleted: true });
});

export {
  getAllTodos,
  storeTodo,
  updateTodo,
  deleteTodo
}