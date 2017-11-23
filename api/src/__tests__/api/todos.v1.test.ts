require('dotenv').config();
import config from '../../config/main';
import {expectError} from '../helpers';
import {generateToken} from '../../utils';
import {createTodo,getTodosForUserId,getTodoById} from '../../repositories/todoRepo';
import {createUser,findUserByEmail} from '../../repositories/userRepo';
import {TITLE_IS_REQUIRED} from '../../constants/errors';
const db = require('../../models');

describe('API V1', () => {

  const request = require('supertest');
  let app: any;

  beforeEach(async() => {
    await db.sequelize.sync({force:true});
    app = require('../../server');
  });

  afterEach(async() => {
    app.close();
  });

  it('should not get list of todos when unauthenticated', async () => {
    const response = await request(app).get('/api/v1/todos');
    expect(response.statusCode).toBe(401);
  });

    
  it('should respond with 401 when token is invalid', async() => {
    const response = await request(app)
                                  .get('/api/v1/todos')
                                  .set('Authorization', 'Bearer invalid-token');
    expect(response.statusCode).toBe(401);
    expect(response.text).toMatchSnapshot();
  });

   it('should show all todos for a authenticated user', async() => {

    const validUser = {email:config.mailgun_test_recipient, password: 'password'};
    const createdUser = await createUser(validUser);
    
    const todo1 = { user_id: createdUser.id,title:'Do the shopping', 
                    description: 'Go to supermarket and buy: milk', completed_at: null, deleted_at: null};
    const todo2 = { user_id: createdUser.id,title:'Go to the gym', 
    description: 'Legs and triceps', completed_at: null, deleted_at: null};
    const deletedTodo3 = { user_id: createdUser.id,title:'Todo has been deleted', 
    description: 'This todo has been deleted', completed_at: null, deleted_at: Date.now()};
    const otherUserTodo = { user_id: 999,title:'This other user todo', 
    description: 'Should not be find in results', completed_at: null, deleted_at: null};
    const createdTodo1 = await createTodo(todo1);

    const createdTodo2 = await createTodo(todo2);
    const deletedTodo = await createTodo(deletedTodo3);
    await createTodo(otherUserTodo);
    const token = await generateToken({_id: createdUser.id});
    
    const response = await request(app)
                                .get('/api/v1/todos')
                                .set('Authorization',`Bearer ${token}`);

    const body = JSON.parse(response.text);
    expect(body.data).toHaveLength(2);
    expect(body.data[0]).toMatchObject(todo1);
    expect(body.data[1]).toMatchObject(todo2);
  });

   it('should not create a new todo when unauthenticated', async () => {
    const response = await request(app).post('/api/v1/todos');
    expect(response.statusCode).toBe(401);
  });

    
  it('should respond with 401 when token is invalid', async() => {
    const response = await request(app)
                                  .post('/api/v1/todos')
                                  .set('Authorization', 'Bearer invalid-token');
    expect(response.statusCode).toBe(401);
  });

  it('should fail to create a new todo without title', async () => {
     const validUser = {email:config.mailgun_test_recipient, password: 'password'};
    const createdUser = await createUser(validUser);
    const token = await generateToken({_id: createdUser.id});

    const response = await request(app).post('/api/v1/todos')
                                       .set('Authorization',`Bearer ${token}`)
                                       .send({});
    expectError(response,TITLE_IS_REQUIRED);
  });

  it('should sucessfully create a new todo', async () => {
    const validUser = {email:config.mailgun_test_recipient, password: 'password'};
    const todo = { title: 'Shopping', description: 'Buy bread, milk and butter'};
    const createdUser = await createUser(validUser);
    const token = await generateToken({_id: createdUser.id});

    const response = await request(app).post('/api/v1/todos')
                                       .set('Authorization',`Bearer ${token}`)
                                       .send(todo);

    const todos = await getTodosForUserId(createdUser.id);
 
    expect(todos).toHaveLength(1);
    expect(todos[0].title).toEqual(todo.title);
    expect(todos[0].title).toEqual(todo.title);
    expect(response.statusCode).toBe(201);
  });

  it('should not update todo when unauthenticated', async () => {
    const response = await request(app).patch('/api/v1/todos/1');
    expect(response.statusCode).toBe(401);
  });

    
  it('should respond with 401 when updating todo and token is invalid', async() => {
    const response = await request(app)
                                  .patch('/api/v1/todos/1')
                                  .set('Authorization', 'Bearer invalid-token');
    expect(response.statusCode).toBe(401);
  });

  it('should fail to update todo without a title', async () => {
     const validUser = {email:config.mailgun_test_recipient, password: 'password'};
    const createdUser = await createUser(validUser);
    const token = await generateToken({_id: createdUser.id});

    const response = await request(app).patch('/api/v1/todos/1')
                                       .set('Authorization',`Bearer ${token}`)
                                       .send({});
    expectError(response,TITLE_IS_REQUIRED);
  });

  it('should not update todo when data are valid but it does not belong to user', async() => {

    const validUser = {email:config.mailgun_test_recipient, password: 'password'};
    const createdUser = await db.User.create(validUser);
    const token = await generateToken({_id: createdUser.id});

     const newData = {title: 'title', description: 'description', user_id: 999,
                        completed_at: null};

    const someoneElseTodo = await createTodo(newData);
    const response = await request(app)
                                .patch(`/api/v1/todos/${someoneElseTodo.id}`)
                                .set('Authorization',`Bearer ${token}`)
                                .type('form')
                                .send(newData);

    expect(response.statusCode).toBe(403);
  });

  it('should update todo when data are valid', async() => {

    const validUser = {email:config.mailgun_test_recipient, password: 'password'};
    const createdUser = await db.User.create(validUser);
    const token = await generateToken({_id: createdUser.id});

    const oldData = {title: 'Old title', description: 'Old description', 
                    user_id: createdUser.id, completed_at: null};

    const todoToBeUpdated = await createTodo(oldData);

    const newData = { 
      title: 'New Title',
      description: 'New Description',
      completed_at: new Date()
    };
  
    const response = await request(app)
                                .patch(`/api/v1/todos/${todoToBeUpdated.id}`)
                                .set('Authorization',`Bearer ${token}`)
                                .type('form')
                                .send(newData);

    const updatedTodo = await getTodoById(todoToBeUpdated.id);

    expect(response.statusCode).toBe(200);
    expect(updatedTodo.title).toBe(newData.title);
    expect(updatedTodo.description).toBe(newData.description);
    expect(updatedTodo.completed_at).toEqual(newData.completed_at);
  });

   it('should not delete todo when unauthenticated', async () => {
    const response = await request(app).delete('/api/v1/todos/1');
    expect(response.statusCode).toBe(401);
  });

    
  it('should respond with 401 when deleting todo and token is invalid', async() => {
    const response = await request(app)
                                  .delete('/api/v1/todos/1')
                                  .set('Authorization', 'Bearer invalid-token');
    expect(response.statusCode).toBe(401);
  });

  it('should not return 404 when todo does not exist', async() => {

    const validUser = {email:config.mailgun_test_recipient, password: 'password'};
    const createdUser = await db.User.create(validUser);
    const token = await generateToken({_id: createdUser.id});

    const response = await request(app)
                                .delete(`/api/v1/todos/999`)
                                .set('Authorization',`Bearer ${token}`);

    expect(response.statusCode).toBe(404);
  });

  it('should not delete todo when it does not belong to user', async() => {

    const validUser = {email:config.mailgun_test_recipient, password: 'password'};
    const createdUser = await db.User.create(validUser);
    const token = await generateToken({_id: createdUser.id});

    const newData = {title: 'title', description: 'description', user_id: 999,
                        completed_at: null};

    const someoneElseTodo = await createTodo(newData);

    const response = await request(app)
                                .delete(`/api/v1/todos/${someoneElseTodo.id}`)
                                .set('Authorization',`Bearer ${token}`);

    expect(response.statusCode).toBe(403);
  });

  it('should delete todo when exists and belongs to user', async() => {

    const validUser = {email:config.mailgun_test_recipient, password: 'password'};
    const createdUser = await db.User.create(validUser);
    const token = await generateToken({_id: createdUser.id});

    const data = {title: 'Old title', description: 'Old description', 
                    user_id: createdUser.id, completed_at: null};

    const todoToBeDeleted = await createTodo(data);

    const response = await request(app)
                                .delete(`/api/v1/todos/${todoToBeDeleted.id}`)
                                .set('Authorization',`Bearer ${token}`);

    const todo = await getTodoById(todoToBeDeleted.id);

    expect(todo).toBeNull();
    expect(response.statusCode).toBe(200);
  });


});