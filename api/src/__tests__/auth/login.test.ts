require('dotenv').config();
import {EMAIL_IS_REQUIRED, EMAIL_IS_INVALID, PASSWORD_IS_REQUIRED,
        PASSWORD_IS_TOO_SHORT, EMAIL_ALREADY_IN_USE, INVALID_CREDENTIALS} from '../../constants/errors';
const db = require('../../models');
import {seedDb} from '../../utils';
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

  it('should fail to log in without input', async () => {
    expect.assertions(2);
    const response = await request(app).post('/auth/login');
    expectError(response,EMAIL_IS_REQUIRED);
  });

  it('should fail to log in when email is invalid', async () => {
    const response = await request(app).post('/auth/login')
                                       .type('form')
                                       .send( { email: 'invalid@email' });
    expectError(response,EMAIL_IS_INVALID);
  });

  it('should fail to log in without password', async () => {
    const response = await request(app).post('/auth/login')
                                       .type('form')
                                       .send( { email: 'valid@email.com' });
    expectError(response,PASSWORD_IS_REQUIRED);
  });

  it('should fail to log in when user does not exist', async () => {
    const response = await request(app).post('/auth/login')
                                       .type('form')
                                       .send( { 
                                         email: 'user_does_not_exist@email.com',
                                         password: 'password'
                                       });
    expectError(response,INVALID_CREDENTIALS);
  });

  it('should fail to log in when user provided wrong password', async () => {
    await db.User.create({email:'valid@email.com', password: 'password'});
    const response = await request(app).post('/auth/login')
                                       .type('form')
                                       .send( { 
                                         email: 'valid@email.com',
                                         password: 'wrong_password'
                                       });
    expectError(response,INVALID_CREDENTIALS);
  });

  it('should login user with valid credentials', async () => {
    expect.assertions(3);
    const validCredentials = {email:'valid@email.com', password: 'password'};
    await db.User.create(validCredentials);
    const response = await request(app).post('/auth/login')
                                       .type('form')
                                       .send(validCredentials);
    const data = JSON.parse(response.text);
    expect(response.statusCode).toBe(200);
    expect(data.token).toMatch(/JWT/);
    expect(data.user).toMatchSnapshot();
  });


});