require('dotenv').config();
import {EMAIL_IS_REQUIRED, EMAIL_IS_INVALID, 
        PASSWORD_IS_REQUIRED, INVALID_CREDENTIALS} from '../../constants/errors';
const db = require('../../models');
import {seedDb} from '../../utils';
import {expectError} from '../helpers';
import config from '../../config/main';
import {findUserByEmail} from '../../repositories/userRepo';

describe('LOGIN', () => {
  const request = require('supertest');
  let app: any;

  beforeEach(async() => {
    await db.sequelize.sync({force:true});
    await seedDb(db.sequelize.queryInterface);
    app = require('../../server');
  });

  afterEach(async() => {
    app.close();
  });

  it('should fail to log in without input', async () => {
    expect.assertions(2);
    const response = await request(app).post('/api/v1/auth/login');
    expectError(response,EMAIL_IS_REQUIRED);
  });

  it('should fail to log in when email is invalid', async () => {
    const response = await request(app).post('/api/v1/auth/login')
                                       .type('form')
                                       .send( { email: 'invalid@email' });
    expectError(response,EMAIL_IS_INVALID);
  });

  it('should fail to log in without password', async () => {
    const response = await request(app).post('/api/v1/auth/login')
                                       .type('form')
                                       .send( { email: config.mailgun_test_recipient });
    expectError(response,PASSWORD_IS_REQUIRED);
  });

  it('should fail to log in when user does not exist', async () => {
    const response = await request(app).post('/api/v1/auth/login')
                                       .type('form')
                                       .send( { 
                                         email: 'user_does_not_exist@email.com',
                                         password: 'password'
                                       });
    expectError(response,INVALID_CREDENTIALS);
  });

  it('should fail to log in when user provided wrong password', async () => {
    await db.User.create({email:config.mailgun_test_recipient, password: 'password'});
    const response = await request(app).post('/api/v1/auth/login')
                                       .type('form')
                                       .send( { 
                                         email: config.mailgun_test_recipient,
                                         password: 'wrong_password'
                                       });
    expectError(response,INVALID_CREDENTIALS);
  });

  it('should login user with valid credentials', async () => {

    const validCredentials = {
       email:config.mailgun_test_recipient, 
       password: 'password', 
       password_reset_token: 'not null - clear up when user know password',
       password_reset_token_expired_at: Date.now()
    };
    
    const user = await db.User.create(validCredentials);
    const response = await request(app).post('/api/v1/auth/login')
                                       .type('form')
                                       .send({ 
                                         email:config.mailgun_test_recipient, 
                                         password: 'password'
                                       });
    const data = JSON.parse(response.text);
    const loggedInUser = await findUserByEmail(config.mailgun_test_recipient);
 
    expect(response.statusCode).toBe(200);
    expect(data.token).toMatch(/JWT/);
    expect(data.user).toMatchSnapshot();
    expect(loggedInUser.password_reset_token).toBeNull();
    expect(loggedInUser.password_reset_token_expired_at).toBeNull();
  });

});