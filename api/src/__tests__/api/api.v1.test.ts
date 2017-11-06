require('dotenv').config();
import { generateToken,comparePassword} from '../../utils';
import {findUserById, findUserByEmail} from '../../repositories/userRepo';
import {UNAUTHORIZED,USER_DOES_NOT_EXIST,PASSWORD_IS_TOO_SHORT,EMAIL_IS_INVALID} from '../../constants/errors';
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

  it('should respond with 200 for health check', async () => {
    expect.assertions(1);
    const response = await request(app).get('/api/v1');
    expect(response.statusCode).toBe(200);
  });

  it('should respond with 404', async () => {
    expect.assertions(2);
    const response = await request(app).get('/not-existing-route');
    expect(response.statusCode).toBe(404);
    expect(response.text).toMatchSnapshot();
  });

  it('should respond with 401 when token is not present', async () => {
    const response = await request(app).get('/api/v1/profile');
    expect(response.statusCode).toBe(401);
    expect(response.text).toMatchSnapshot();
  });

  it('should respond with 401 when token is invalid', async() => {
    const response = await request(app)
                                  .get('/api/v1/profile')
                                  .set('Authorization', 'Bearer invalid-token');
    expect(response.statusCode).toBe(401);
    expect(response.text).toMatchSnapshot();
  });

  it('should respond with 400 when _id is not present in user data', async() => {
    const userIdWhichDoesNotExist = 999;
    const token = await generateToken({});
    const response = await request(app)
                                  .get('/api/v1/profile')
                                  .set('Authorization',`Bearer ${token}`);
    expect(response.statusCode).toBe(400);
  });

  it('should respond with 401 when token is valid, but user does not exist anymore', async() => {
    const userIdWhichDoesNotExist = 999;
    const token = await generateToken({_id: userIdWhichDoesNotExist});
    const response = await request(app)
                                  .get('/api/v1/profile')
                                  .set('Authorization',`Bearer ${token}`);
    expect(response.statusCode).toBe(401);
    expect(response.text).toMatchSnapshot();
  });

  it('should respond with 200 when token is valid and user exists', async() => {
    const validUser = {email:config.mailgun_test_recipient, password: 'password'};
    const foundUser = await db.User.create(validUser);
    const token = await generateToken({_id: foundUser.id});
    const response = await request(app)
                                  .get('/api/v1/profile')
                                  .set('Authorization',`Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.text).toMatch(config.mailgun_test_recipient);
  });

  it('should fail to update a profile if password is present but too short', async () => {
    const validUser = {email:config.mailgun_test_recipient, password: 'password'};
    const createdUser = await db.User.create(validUser);
    const token = await generateToken({_id: createdUser.id});

    const response = await request(app)
                            .patch(`/api/v1/profile/${createdUser.id}`)
                            .set('Authorization',`Bearer ${token}`)
                            .type('form')
                            .send({ password: 'short' });

    expectError(response,PASSWORD_IS_TOO_SHORT);
  });

  it('should fail to update user when email field is present but invalid', async () => {
    const validUser = {email:config.mailgun_test_recipient, password: 'password'};
    const createdUser = await db.User.create(validUser);
    const token = await generateToken({_id: createdUser.id});
    const response = await request(app) .patch(`/api/v1/profile/${createdUser.id}`)
                                        .set('Authorization',`Bearer ${token}`)
                                        .type('form')
                                        .send({ email: 'invalid@email'});
    expectError(response,EMAIL_IS_INVALID);
  });

  it('should update user when data are valid', async() => {

    const validUser = {email:config.mailgun_test_recipient, password: 'password'};
    const createdUser = await db.User.create(validUser);
    const token = await generateToken({_id: createdUser.id});
    const newData = { 
      email: 'newemail@email.com',
      password: 'password2',
      bio: 'Natural Born Killer',
      first_name: 'James',
      last_name: 'Bond'
    };
  
    const response = await request(app)
                                .patch(`/api/v1/profile/${createdUser.id}`)
                                .set('Authorization',`Bearer ${token}`)
                                .type('form')
                                .send(newData);
    const updatedUser = await findUserById(createdUser.id);
    const passwordMatch = await comparePassword(newData.password, updatedUser.password);
    expect(response.statusCode).toBe(200);
    expect(updatedUser.email).toBe(newData.email);
    expect(updatedUser.bio).toBe(newData.bio);
    expect(updatedUser.first_name).toBe(newData.first_name);
    expect(updatedUser.last_name).toBe(newData.last_name);
    expect(passwordMatch).toBe(true);
  });

});
