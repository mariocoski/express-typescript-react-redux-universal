require('dotenv').config();
import {EMAIL_IS_REQUIRED, EMAIL_IS_INVALID, PASSWORD_IS_REQUIRED,
        PASSWORD_IS_TOO_SHORT, EMAIL_ALREADY_IN_USE} from '../../constants/errors';
const db = require('../../models');
import {seedDb} from '../../utils';
import {expectError} from '../helpers';
import {USER_ROLE, ADMIN_ROLE, SUPERADMIN_ROLE} from '../../constants/roles';
import config from '../../config/main';
import {findUserByEmail} from '../../repositories/userRepo';

describe('REGISTER', () => {
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

  it('should fail to create a user without input', async () => {
    const response = await request(app).post('/auth/register');
    expectError(response,EMAIL_IS_REQUIRED);
  });

  it('should fail to create a user when email is invalid', async () => {
    const response = await request(app).post('/auth/register')
                                       .type('form')
                                       .send( { email: 'invalid@email' });
    expectError(response,EMAIL_IS_INVALID);
  });

  it('should fail to create a user without password', async () => {
    const response = await request(app).post('/auth/register')
                                       .type('form')
                                       .send( { email: config.mailgun_test_recipient });
    expectError(response,PASSWORD_IS_REQUIRED);
  });

  it('should fail to create a user without password', async () => {
    const response = await request(app).post('/auth/register')
                                       .type('form')
                                       .send( { email: config.mailgun_test_recipient, password: 'short' });
    expectError(response,PASSWORD_IS_TOO_SHORT);
  });

  it('should fail to create a user without password', async () => {
    const response = await request(app).post('/auth/register')
                                       .type('form')
                                       .send( { email: config.mailgun_test_recipient, password: 'short' });
    expectError(response,PASSWORD_IS_TOO_SHORT);
  });

  it('should fail to create a user with the same email address', async () => {
    const validUser = {email:config.mailgun_test_recipient, password: 'password'};
    await db.User.create(validUser);
    const response = await request(app).post('/auth/register')
                                       .type('form')
                                       .send( validUser);
    expectError(response,EMAIL_ALREADY_IN_USE);
  });

  it('should create a user with valid input', async () => {
    const response = await request(app).post('/auth/register')
                                       .type('form')
                                       .send( { email: config.mailgun_test_recipient, password: 'longenough' });
    const data = JSON.parse(response.text);

    const newlyCreatedUser = await findUserByEmail(config.mailgun_test_recipient);

    expect(newlyCreatedUser.verify_token).toBeTruthy();
    expect(response.statusCode).toBe(201);
    expect(data.token).toMatch(/JWT/);
    expect(data.user).toMatchSnapshot();
  });
});