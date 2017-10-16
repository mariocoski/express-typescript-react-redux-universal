import {config} from 'dotenv';
if(process.env.NODE_ENV !== 'production'){
  config();
}
import * as JWT from 'jsonwebtoken';
import * as crypto from 'crypto';
import * as db from '../models';
import { USER_ROLE, ADMIN_ROLE, SUPERADMIN_ROLE } from '../constants/roles';
import {Request, Response} from 'express';
import { validationResult } from 'express-validator/check'
import * as bcrypt from 'bcrypt';
import {BadRequestError, NotFoundError, ForbiddenError,UnauthorizedError, BaseError } from '../lib/errors';

export function resolvePort(portCandidate: string|undefined):number{

    if(portCandidate === undefined){
      throw new Error(`Port ${portCandidate} is not numeric`);
    }

    const port = parseInt(portCandidate, 10);

    if (isNaN(port)) {
      throw new Error(`Port ${portCandidate} is not numeric`);
    }

    if (port >= 0) {
      return port;
    }
    throw new Error(`Port ${portCandidate} is not numeric`);
}

export function generateToken(user: any) {
  return JWT.sign(user, env('JWT_SECRET'), {
    expiresIn: env('JWT_EXPIRATION_TIME')
  });
}

export function getErrors(req: Request){
  return validationResult(req).formatWith(({ location, msg, param, value })=>{
    return {message:msg};
  });
}

export function formatError(message: string, stack: string|undefined = undefined){
  return (stack !== undefined) ? { error : message, stack}:{ error: message };
}

export function handleError(res: Response, err: any){
  if(process.env.NODE_ENV !== 'test'){
    console.error(err);
  }
  const IS_PROD = process.env.NODE_ENV === 'production';
  switch (err.constructor) {
    case BadRequestError:
      return res.status(400).json(formatError(err.message));
    case NotFoundError:
      return res.status(404).json(formatError(err.message));
    case ForbiddenError:
      return res.status(403).json(formatError(err.message));
    case UnauthorizedError:
      return res.status(401).json(formatError(err.message));
    case BaseError:
      const errObj = (IS_PROD) ? formatError(err.message) : formatError(err.message. err.stack);
      return res.status(500).json(errObj);
    default:
      return res.status(500).json(err.message);
  }
};

export const catchErrors = (handler: any, catcher = handleError) => async (req: Request, res: Response) => {
  try {
    await handler(req, res);
  } catch (err) {
    return catcher(res, err);
  }
};

export const getRoleId = (role: string): number => {
  switch(role){
    case USER_ROLE:
     return 1;
    case ADMIN_ROLE:
      return 2;
    case SUPERADMIN_ROLE:
      return 3;
    default:
      throw new Error(`Role ${role} is not defined`);
  }
};

export function env(key: string, defaultVal:string|undefined = undefined): string {

  const myVal: undefined | string  = process.env[key];
 
  if(typeof myVal === 'undefined' && defaultVal === undefined){
      throw new Error(`No ENV ${key} was found`);
  }

  if(typeof myVal === 'string' ){
    return myVal; 
  }

  if(typeof defaultVal === 'string'){
    return defaultVal;
  }
  throw new Error(`No ENV ${key} was found`);
}

export async function generateHash(password: string): Promise<string>{
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean>{
  return bcrypt.compare(password, hashedPassword);
}

export async function seedUsers(queryInterface: any){
  return queryInterface.bulkInsert('users', 
  [
    {
      id: 1,
      email: 'user@test.com',
      password: await generateHash('password'),
      first_name: 'Joe',
      last_name: 'Doe',
      bio: 'Joe is a user',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 2,
      email: 'admin@test.com',
      password: await generateHash('password'),
      first_name: 'John',
      last_name: 'Doe',
      bio: 'John is an admin',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 3,
      email: 'superadmin@test.com',
      password: await generateHash('password'),
      first_name: 'Jane',
      last_name: 'Doe',
      bio: 'Jane is a superadmin',
      created_at: new Date(),
      updated_at: new Date()
   }
  ], {});
}

export async function seedRoles(queryInterface: any){
  return queryInterface.bulkInsert('roles', [
    {
      id: 1,
      name: USER_ROLE,
      description: 'user role'
    },
    {
      id: 2,
      name: ADMIN_ROLE,
      description: 'admin role'
    },
    {
      id: 3,
      name: SUPERADMIN_ROLE,
      description: 'superadmin role'
    }
  ], {});
}

export async function seedUsersRoles(queryInterface: any){
  return queryInterface.bulkInsert('users_roles', [
    {
      user_id: 1,
      role_id: getRoleId(USER_ROLE) 
    },
    {
      user_id: 2,
      role_id: getRoleId(USER_ROLE) 
    },
    {
      user_id: 2,
      role_id: getRoleId(ADMIN_ROLE) 
    },
    {
      user_id: 3,
      role_id: getRoleId(USER_ROLE) 
    },
    {
      user_id: 3,
      role_id: getRoleId(ADMIN_ROLE) 
    },
    {
      user_id: 3,
      role_id: getRoleId(SUPERADMIN_ROLE) 
    },
  ], {});
}

export async function seedDb(queryInterface: any): Promise<any>{
    return new Promise(async(resolve, reject) => {
      try {
        await seedUsers(queryInterface),
        await seedRoles(queryInterface),
        await seedUsersRoles(queryInterface)
        resolve();
      }catch(e){
       console.log(e);
      }
    });
}

export function onError(error: any, port: number){  
  if (error.syscall !== "listen") {
    throw error;
  }

  switch (error.code) {
    case "EACCES":
      if(process.env.NODE_ENV !== 'test'){
        console.log(port + " requires elevated privileges");
      }
      process.exit(1);
      break;
    case "EADDRINUSE":
      if(process.env.NODE_ENV !== 'test'){
        console.log(port + " is already in use");
      }
      process.exit(1);
      break;
    default:
      throw error;
  }
}


// export function isAuthorized(role: String){
//   return function(req: Request,res: ResponssetUserInfoe,next:Function){
//     const user = req.user;

//     User.findById(user._id, (err, foundUser:any)=>{

//       if(err) {
//         res.status(422).json({error: 'No user found'});
//         return next(err);
//       }
//       if(getRole(foundUser.role) >= getRole(role)){
//         return next();
//       }
//       res.status(401).json({error: "You are not authorized to see the content"});
//       return next(err);
//     });


//   }
// }

