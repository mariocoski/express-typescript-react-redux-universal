require('dotenv').config();
import config from '../../config/main';
import {expectError} from '../helpers';
import {generateToken} from '../../utils';
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
    const createdUser = await db.User.create(validUser);
    
    const token = await generateToken({_id: createdUser.id});
    
    const response = await request(app)
                                .get('/api/v1/todos')
                                .set('Authorization',`Bearer ${token}`);


    expect(response.statusCode).toBe(200);
  });

});