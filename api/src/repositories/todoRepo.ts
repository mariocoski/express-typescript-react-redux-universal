const db = require('../models');

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