require('dotenv').config();
import {UNAUTHORIZED} from '../../constants/errors';

describe('API V1', () => {

  const request = require('supertest');  
  let app: any;

  beforeEach(() => {
    app = require('../../server');
  });

  afterEach(() => {
    app.close();
  });

  it('should respond with 200 for health check', async () => {
    expect.assertions(1);
    const response = await request(app).get('/api/v1');
    expect(response.statusCode).toBe(200);
  });

  it('should respond with 404', async () => {
    expect.assertions(2);
    const response = await request(app).get('/not-existing-router');
    expect(response.statusCode).toBe(404);
    expect(response.text).toMatch('Not found');
  });

  it('should respond with 401 when token is not present', async () => {
    const response = await request(app).get('/api/v1/profile');
    expect(response.statusCode).toBe(401);
    expect(response.text).toMatch(UNAUTHORIZED);
  });

});
