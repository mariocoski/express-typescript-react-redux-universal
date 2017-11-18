require('dotenv').config();
import config from '../../config/main';
import {expectError} from '../helpers';
import {generateToken} from '../../utils';
import {createTodo} from '../../repositories/todoRepo';
import {createUser} from '../../repositories/userRepo';
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

});