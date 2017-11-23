const db = require('../models');
import * as _ from 'lodash';

export async function createTodo(values: Object, settings: Object = {}) {
  const options = { fields: 
    ['user_id','title', 'description', 'completed_at', 'deleted_at', 'created_at', 'updated_at'],
    ...settings 
  };
  return db.Todo.create(values, options);
}

export async function getTodosForUserId(user_id: string) {
  return db.Todo.findAll({ where: { user_id, deleted_at: null } });
}

export async function getTodoById(todo_id: string){
  return db.Todo.findOne({ where: { deleted_at: null } });
}

export async function updateTodoById(todoId: number, data: any) {
  const fillable = ['title','description', 'completed_at'];
  
  const validData: any = _.pick(data, fillable);

  return db.Todo.update(validData, {
    where: {
      id: todoId
    }
  });
}

export async function deleteTodoById(todoId: number) {
  return db.Todo.destroy({
    where: {
      id: todoId
    }
  });
}