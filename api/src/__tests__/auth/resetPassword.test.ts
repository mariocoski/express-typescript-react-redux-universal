require('dotenv').config();
import {TOKEN_IS_REQUIRED, EXPIRED_PASSWORD_RESET_TOKEN, 
  PASSWORD_IS_REQUIRED,PASSWORD_IS_TOO_SHORT, PASSWORD_CONFIRMATION_MUST_MATCH_PASSWORD,
  INVALID_PASSWORD_RESET_TOKEN} from '../../constants/errors';
const db = require('../../models');
import {seedDb, comparePassword} from '../../utils';
import {sendEmail} from '../../utils/mail';
import {findUserByEmail} from '../../repositories/userRepo';
import {expectError} from '../helpers';
import config from '../../config/main';
import {TWO_HOURS} from '../../constants';

describe('RESET PASSWORD', () => {
  const request = require('supertest');
  const validData = { token: 'valid-token', password: 'new_password', password_confirmation: 'new_password' };

  let app: any;

  beforeEach(async() => {
    await db.sequelize.sync({force:true});
    await seedDb(db.sequelize.queryInterface);
    app = require('../../server');
  });

  afterEach(async() => {
    app.close();
  });

  it('should not reset password without token', async () => {
    expect.assertions(2);
    const response = await request(app).post('/auth/reset-password');
    expectError(response, TOKEN_IS_REQUIRED);
  });

  it('should not reset password without password', async () => {
    expect.assertions(2);
    const response = await request(app).post('/auth/reset-password')
                                       .type('form')
                                       .send( { token: 'token', password: 'short' });
    expectError(response, PASSWORD_IS_TOO_SHORT);
  });

  it('should not reset password without password', async () => {
    expect.assertions(2);
    const response = await request(app).post('/auth/reset-password')
                                       .type('form')
                                       .send({ 
                                         token: 'token', 
                                         password: 'longenough', 
                                         password_confirmation: 'notmatch' 
                                       });
    expectError(response, PASSWORD_CONFIRMATION_MUST_MATCH_PASSWORD);
  });

  it('should not reset password without password_confirmation', async () => {
    expect.assertions(2);
    const response = await request(app).post('/auth/reset-password')
                                       .type('form')
                                       .send( { token: 'token' });
    expectError(response, PASSWORD_IS_REQUIRED);
  });

  it('should not allow to reset password when token does not match a user', async () => {
    await db.User.create({
      email:config.mailgun_test_recipient, 
      password: 'password',
      password_reset_token: 'valid-token'
    });
    expect.assertions(2);
    const response = await request(app).post('/auth/reset-password')
                                       .type('form')
                                       .send({ 
                                         token: 'invalid-token', 
                                         password: 'new_password', 
                                         password_confirmation: 'new_password' 
                                       });
    expectError(response, INVALID_PASSWORD_RESET_TOKEN);
  });

  

  it('should not allow to reset password when token its expired', async () => {
    await db.User.create({
      email:config.mailgun_test_recipient, 
      password: 'password',
      password_reset_token: 'valid-token',
      password_reset_token_expired_at: new Date(Date.now() - TWO_HOURS)
    });
    expect.assertions(2);
    const response = await request(app).post('/auth/reset-password')
                                       .type('form')
                                       .send(validData);
    expectError(response, EXPIRED_PASSWORD_RESET_TOKEN);
  });

  // it('should allow to reset password when token is valid and not expired', async () => {
  //   await db.User.create({
  //     email:config.mailgun_test_recipient, 
  //     password: 'password',
  //     password_reset_token: 'valid-token',
  //     password_reset_token_expired_at: new Date()
  //   });
  //   expect.assertions(2);
  //   const response = await request(app).post('/auth/reset-password')
  //                                      .type('form')
  //                                      .send(validData);
  //   const user = await findUserByEmail(config.mailgun_test_recipient);
  //   expect(comparePassword(validData.password, user.password)).toBe(true);
  //   expect(response.statusCode).toBe(200);
  //   expect(user.password_reset_token).toBeNull();
  //   expect(user.password_reset_token_expired_at).toBeNull();
  // });


});