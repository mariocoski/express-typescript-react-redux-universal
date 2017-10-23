require('dotenv').config();
import {EMAIL_IS_REQUIRED, EMAIL_IS_INVALID, PASSWORD_IS_REQUIRED, USER_NOT_FOUND,
        PASSWORD_IS_TOO_SHORT, EMAIL_ALREADY_IN_USE, INVALID_CREDENTIALS} from '../../constants/errors';
const db = require('../../models');
import {seedDb} from '../../utils';
import {findUserByEmail} from '../../repositories/userRepo';
import {USER_ROLE, ADMIN_ROLE, SUPERADMIN_ROLE} from '../../constants/roles';
import {expectError} from '../helpers';

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

  it('should fail to send reminder link without email', async () => {
    expect.assertions(2);
    const response = await request(app).post('/auth/forgot-password');
    expectError(response, EMAIL_IS_REQUIRED);
  });

  it('should fail to send reminder link valid email', async () => {
    const response = await request(app).post('/auth/forgot-password')
                                       .type('form')
                                       .send( { email: 'invalid@email' });
    expectError(response,EMAIL_IS_INVALID);
  });

  it('should fail to send reminder link when email does not match any user', async () => {
    const response = await request(app).post('/auth/forgot-password')
                                       .type('form')
                                       .send( { email: 'valid@email.com' });

    expectError(response,USER_NOT_FOUND);
  });

  it('should send an email with link when email exists', async () => {
    await db.User.create({email:'valid@email.com', password: 'password'});
    const response = await request(app).post('/auth/forgot-password')
                                       .type('form')
                                       .send( { email: 'valid@email.com' });

    const user = await findUserByEmail('valid@email.com');
    expect(response.statusCode).toBe(200);
    expect(user.password_reset_token).toBeTruthy();
    expect(user.password_reset_token_expired_at).toBeTruthy();
    //@todo should check if email being sent
  });
});