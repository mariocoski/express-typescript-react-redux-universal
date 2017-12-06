require('dotenv').config();
import {EMAIL_IS_REQUIRED, EMAIL_IS_INVALID, USER_NOT_FOUND} from '../../constants/errors';
const db = require('../../models');
import {seedDb} from '../../utils';
import {findUserByEmail} from '../../repositories/userRepo';
import {expectError} from '../helpers';
import config from '../../config/main';

jest.mock('mailgun-js',()=>{
  return jest.fn((options)=>{
    return {
      messages: jest.fn(() => {
        return {
          send: jest.fn()
        }
      })
    }
  });
});

describe('FORGOT PASSWORD', () => {
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

  it('should fail to send reminder link without email', async () => {
    expect.assertions(2);
    const response = await request(app).post('/api/v1/auth/forgot-password');
    expectError(response, EMAIL_IS_REQUIRED);
  });

  it('should fail to send reminder link valid email', async () => {
    const response = await request(app).post('/api/v1/auth/forgot-password')
                                       .type('form')
                                       .send( { email: 'invalid@email' });
    expectError(response,EMAIL_IS_INVALID);
  });

  it('should fail to send reminder link when email does not match any user', async () => {
    const response = await request(app).post('/api/v1/auth/forgot-password')
                                       .type('form')
                                       .send( { email: config.mailgun_test_recipient });

    expectError(response,USER_NOT_FOUND);
  });

  it('should send an email with link when email exists', async () => {
    await db.User.create({email:config.mailgun_test_recipient, password: 'password'});
    const response = await request(app).post('/api/v1/auth/forgot-password')
                                       .type('form')
                                       .send( { email: config.mailgun_test_recipient });
    const user = await findUserByEmail(config.mailgun_test_recipient);
    expect(response.statusCode).toBe(200);
    expect(user.password_reset_token).toBeTruthy();
    expect(user.password_reset_token_expired_at).toBeTruthy();
  });
});