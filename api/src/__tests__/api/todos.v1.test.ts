require('dotenv').config();
import config from '../../config/main';
import {expectError} from '../helpers';

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

});