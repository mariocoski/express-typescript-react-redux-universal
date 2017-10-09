require('dotenv').config();
import {EMAIL_IS_REQUIRED, EMAIL_IS_INVALID, PASSWORD_IS_REQUIRED,
        PASSWORD_IS_TOO_SHORT} from '../../constants/errors';
import * as db from '../../models';

async function expectError(response, error){
  expect(response.statusCode).toBe(422);
  expect(response.text).toMatch(error);
}

describe('AUTH', () => {

  const request = require('supertest');
  let app;

  beforeEach((done) => {
    db['sequelize'].sync({force:true});
    app = require('../../server');
    
  });

  afterEach(() => {
    app.close();
  });

  it('should fail to create a user without input', async () => {
    expect.assertions(2);
    const response = await request(app).post('/auth/register');
    expectError(response,EMAIL_IS_REQUIRED);
  });

  it('should fail to create a user when email is invalid', async () => {
    expect.assertions(2);
    const response = await request(app).post('/auth/register')
                                       .type('form')
                                       .send( { email: 'invalid@email' });
    expectError(response,EMAIL_IS_INVALID);
  });

  it('should fail to create a user without password', async () => {
    expect.assertions(2);
    const response = await request(app).post('/auth/register')
                                       .type('form')
                                       .send( { email: 'valid@email.com' });
    expectError(response,PASSWORD_IS_REQUIRED);
  });

  it('should fail to create a user without password', async () => {
    expect.assertions(2);
    const response = await request(app).post('/auth/register')
                                       .type('form')
                                       .send( { email: 'valid@email.com', password: 'short' });
    expectError(response,PASSWORD_IS_TOO_SHORT);
  });

  it('should fail to create a user without password', async () => {
    expect.assertions(2);
    const response = await request(app).post('/auth/register')
                                       .type('form')
                                       .send( { email: 'valid@email.com', password: 'short' });
    expectError(response,PASSWORD_IS_TOO_SHORT);
  });

  // it('should create a user with valid input', async () => {
  //   expect.assertions(3);
   
  //   const response = await request(app).post('/auth/register')
  //                                      .type('form')
  //                                      .send( { email: 'valid@email.com', password: 'longenough' });
  //   const data = JSON.parse(response.text);
  //   expect(response.statusCode).toBe(201);
  //   expect(data.token).toEqual( expect.any(String));
  //   expect(data.user).toEqual( expect.any(Object));
  // });

});