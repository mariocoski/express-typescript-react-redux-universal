import {env, seedDb, generateHash, getRoleId, formatError,
        comparePassword, generateToken, resolvePort} from '../../utils';
import {UnauthorizedError, BadRequestError, ForbiddenError, 
        NotFoundError, BaseError} from '../../lib/errors';
import {USER_ROLE, ADMIN_ROLE, SUPERADMIN_ROLE} from '../../constants/roles.js';
describe('UTILS', () => {

  it('should throw an error when no default value provided for env variable', () =>{
    expect.assertions(1);
    expect(true).toBe(true);
  });

  it('can seed database', async ()=>{
    expect.assertions(4);
    const queryInterface:any = {};
    const mock = queryInterface.bulkInsert = jest.fn();
    await seedDb(queryInterface);
    expect(mock.mock.calls.length).toBe(3);
    expect(mock.mock.calls[0][0]).toBe('users');
    expect(mock.mock.calls[1][0]).toBe('roles');
    expect(mock.mock.calls[2][0]).toBe('users_roles');
  });

  it('can get default value of env variable', () => {
    expect.assertions(1);
    expect(env('FOOBAR','bar')).toBe('bar');
  });

  it(`can throw an exception when default value 
    not provided and env var does not exist`, () => {
    expect.assertions(1);
    const shouldThrowError = () => {
      env('FOOBAR');
    }
    expect(shouldThrowError).toThrowError(/No ENV FOOBAR was found/);
  });

  test('if UnauthorizedError has message and is an instance of Base error', () => {
    expect.assertions(2);
    expect(new UnauthorizedError().message).toMatch('Unauthorized');
    expect(UnauthorizedError.prototype).toBeInstanceOf(BaseError);
  });

  test('if BadRequestError has message and is an instance of Base error', () => {
    expect.assertions(2);
    expect(new BadRequestError().message).toMatch('Bad request');
    expect(BadRequestError.prototype).toBeInstanceOf(BaseError);
  });

  test('if ForbiddenError has message and is an instance of Base error', () => {
    expect.assertions(2);
    expect(new NotFoundError().message).toMatch('Not found');
    expect(NotFoundError.prototype).toBeInstanceOf(BaseError);
  });

  test('if ForbiddenError has message and is an instance of Base error', () => {
    expect.assertions(2);
    expect(new ForbiddenError().message).toMatch('Forbidden');
    expect(ForbiddenError.prototype).toBeInstanceOf(BaseError);
  });

  jest.mock('bcrypt');
  it('can generate hash', async() => {
    expect.assertions(1);
    const hash = await generateHash('password');
    expect(hash).toBe('hashedpassword');
  });

  it('can verify hash', async() => {
    expect.assertions(1);
    const match = await comparePassword('password', 'hashedpassword');
    expect(match).toBe(true);
  });
  
  jest.mock('jsonwebtoken');
  it('can generate token for a user', async() => {
    expect.assertions(1);
    const token = await generateToken({});
    expect(token).toBe('JWT token');
  });

  it('should get role by id', () => {
    expect.assertions(4);
    const shouldThrowError = () => {
      getRoleId('DOES_NOT_EXIST');
    }
    expect(getRoleId(USER_ROLE)).toBe(1);
    expect(getRoleId(ADMIN_ROLE)).toBe(2);
    expect(getRoleId(SUPERADMIN_ROLE)).toBe(3);
    expect(shouldThrowError).toThrowError('Role DOES_NOT_EXIST is not defined');
  });

  it('can format an error response', () => {
    expect.assertions(1);
    const error = 'Email already in use';
    expect(formatError(error)).toEqual({error});
  });

  it('can format an error response', () => {
    expect.assertions(2);
    const shouldThrowError = () => {
      resolvePort(undefined);
    }
    expect(resolvePort('3000')).toEqual(3000);
    expect(shouldThrowError).toThrowError('Port undefined is not numeric');
  });
});