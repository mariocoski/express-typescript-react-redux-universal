
import {env, seedDb, generateHash, getRoleId, formatError,
        comparePassword, generateToken, resolvePort, onError} from '../../utils';
import {UnauthorizedError, BadRequestError, ForbiddenError, 
  NotFoundError, BaseError} from '../../lib/errors';
import {USER_ROLE, ADMIN_ROLE, SUPERADMIN_ROLE} from '../../constants/roles.js';
import {sendEmail} from '../../utils/mail';

jest.mock('bcrypt', () => ({
  hash: jest.fn(()=>{
    return Promise.resolve('hashedpassword');
  }),
  compare: jest.fn((password)=>{
    if(password === 'password'){
      return Promise.resolve(true);
    }else{
      return Promise.reject(false);
    } 
  })
}));
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(()=>{
    return "JWT token";
  })
}));

import * as bcrypt from 'bcrypt';

describe('UTILS', () => {
  it('can seed database', async ()=>{
    const queryInterface:any = {};
    const mock = queryInterface.bulkInsert = jest.fn();
    await seedDb(queryInterface);
    expect(mock.mock.calls.length).toBe(3);
    expect(mock.mock.calls[0][0]).toBe('users');
    expect(mock.mock.calls[1][0]).toBe('roles');
    expect(mock.mock.calls[2][0]).toBe('users_roles');
  });

  it('can get default value of env variable', () => {
    expect(env('FOOBAR','bar')).toBe('bar');
  });

  it(`can throw an exception when default value 
    not provided and env var does not exist`, () => {
    const shouldThrowError = () => {
      env('FOOBAR');
    }
    expect(shouldThrowError).toThrowError(/No ENV FOOBAR was found/);
  });

  test('if UnauthorizedError has message and is an instance of Base error', () => {
    expect(new UnauthorizedError().message).toMatch('Unauthorized');
    expect(UnauthorizedError.prototype).toBeInstanceOf(BaseError);
  });

  test('if BadRequestError has message and is an instance of Base error', () => {
    expect(new BadRequestError().message).toMatch('Bad request');
    expect(BadRequestError.prototype).toBeInstanceOf(BaseError);
  });

  test('if ForbiddenError has message and is an instance of Base error', () => {
    expect(new NotFoundError().message).toMatch('Not found');
    expect(NotFoundError.prototype).toBeInstanceOf(BaseError);
  });

  test('if ForbiddenError has message and is an instance of Base error', () => {
    expect(new ForbiddenError().message).toMatch('Forbidden');
    expect(ForbiddenError.prototype).toBeInstanceOf(BaseError);
  });

  it('can generate hash', async() => {    
    const hash = await generateHash('password',bcrypt);
    expect(hash).toBe('hashedpassword');
  });

  it('can verify hash', async() => {
    const match = await comparePassword('password', 'hashedpassword',bcrypt);
    expect(match).toBe(true);
  });
  
  jest.mock('jsonwebtoken');
  it('can generate token for a user', async() => {
    const token = await generateToken({});
    expect(token).toBe('JWT token');
  });

  it('should get role by id', () => {
    const shouldThrowError = () => {
      getRoleId('DOES_NOT_EXIST');
    }
    expect(getRoleId(USER_ROLE)).toBe(1);
    expect(getRoleId(ADMIN_ROLE)).toBe(2);
    expect(getRoleId(SUPERADMIN_ROLE)).toBe(3);
    expect(shouldThrowError).toThrow();
  });

  it('can format an error response', () => {
    const error = 'Email already in use';
    expect(formatError(error)).toEqual({error});
  });

  it('can format an error response', () => {
    const shouldThrowError = () => {
      resolvePort(undefined);
    }
    expect(resolvePort('3000')).toEqual(3000);
    expect(shouldThrowError).toThrowError('Port undefined is not numeric');
  });

  it('can format an error response', () => {
    const shouldThrowError = () => {
      resolvePort(undefined);
    }
    expect(resolvePort('3000')).toEqual(3000);
    expect(shouldThrowError).toThrowError('Port undefined is not numeric');
  });

  it('should throw error when syscall not equals listen', () => {
    const port = 3000;
    const newErr = {syscall: 'not_listen'};

    const shouldThrowError = () => {
      onError(newErr, 3000);
    }
    expect(shouldThrowError).toThrowError();
  });

  it('should throw error for not known code', () => {
    const port = 3000;
    const newErr = new Error();
    const shouldThrowError = () => {
      onError(newErr, port);
    }
    expect(shouldThrowError).toThrowError();
  });

});
