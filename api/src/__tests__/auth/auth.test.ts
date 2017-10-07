describe('AUTH', () => {

  const request = require('supertest');
  let app;

  beforeEach(() => {
    app = require('../../server');
  });

  afterEach(() => {
    app.close();
  });

  it('should fail to create a user without input', async () => {
    expect.assertions(2);
    const response = await request(app).post('/auth/register');
    expect(response.statusCode).toBe(422);
    expect(response.text).toMatchSnapshot();
  });

  it('should fail to create a user when email is invalid', async () => {
    expect.assertions(2);
    const response = await request(app).post('/auth/register')
    .type('form')
    .send({
      email: 'invalidEmail'
    });
    expect(response.statusCode).toBe(422);
    expect(response.text).toMatchSnapshot();
  });

  //   .post('register', register)
    //   .post('login', requireLogin, login)
    //   .post('forgot-password', forgotPassword)
    //   .post('reset-password/:token', verifyToken)
    //   .post('me-from-token', meFromToken);


});