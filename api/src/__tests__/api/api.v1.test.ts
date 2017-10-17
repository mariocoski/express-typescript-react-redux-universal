require('dotenv').config();
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
    expect(response.statusCode).toBe(201);
  });

  it('should respond with 404', async () => {
    expect.assertions(2);
    const response = await request(app).get('/not-existing-router');
    expect(response.statusCode).toBe(404);
    expect(response.text).toMatch('Not found');
  });






});