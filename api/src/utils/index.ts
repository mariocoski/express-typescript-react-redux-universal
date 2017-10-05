import {ROLE_USER, ROLE_PROFESSIONAL, ROLE_ADMIN, ROLE_SUPERADMIN} from '../constants/roles';
import {Request, Response} from 'express';
import {User} from '../models/user';
import {BadRequestError, NotFoundError, ForbiddenError,UnauthorizedError, BaseError } from '../lib/errors';
export function resolvePort(val: any) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
      return val;
    }

    if (port >= 0) {
      return port;
    }

    return 3000;
}
/*
const generateModelRoutes = (model) => {
  const routeSuffix = model.modelName.toLowerCase();
  const authentication = (req, res, next) =>
    passport.authenticate(
      ['jwt', 'clientBasic'],
      DEFAULT_PASSPORT_OPTIONS,
      (err, user) => {
        if (err) {
          return handleError(res, err);
        }
        req.user = user;
        return next();
      }
    )(req, res, next);
  generateConnectionsRoute(model, routeSuffix, authentication);
  generateIndexesRoute(model, routeSuffix, authentication);
};

*/

export function handleError(res, err){
  console.error(err);

  switch (err.constructor) {
    case BadRequestError:
      return res.status(400).send(err.message);
    case NotFoundError:
      return res.status(404).send(err.message);
    case ForbiddenError:
      return res.status(403).send(err.message);
    case UnauthorizedError:
      return res.status(401).send(err.message);
    case BaseError:
      return res.status(500).send(`${err.message}\n${err.stack}`);
    default:
      return res.status(500).send(err);
  }
};

export async function catchErrors(req, res){
  try {
    await catchErrors(req, res);
  } catch (err) {
    return handleError(res, err);
  }
};



export const setUserInfo = (request) => {
  const getUserInfo = {
    _id: request._id,
    firstName: request.profile.firstName,
    lastName: request.profile.lastName,
    email: request.email,
    role: request.role
  };

  return getUserInfo;
};

export const getRole = (checkRole) => {
  let role;

  switch (checkRole) {
    case ROLE_SUPERADMIN: role = 4; break;
    case ROLE_ADMIN: role = 3; break;
    case ROLE_PROFESSIONAL: role = 2; break;
    case ROLE_USER: role = 1; break;
    default: role = 1;
  }

  return role;
};

export function isAuthorized(role: String){
  return function(req: Request,res: Response,next:Function){
    const user = req.user;

    User.findById(user._id, (err, foundUser:any)=>{

      if(err) {
        res.status(422).json({error: 'No user found'});
        return next(err);
      }
      if(getRole(foundUser.role) >= getRole(role)){
        return next();
      }
      res.status(401).json({error: "You are not authorized to see the content"});
      return next(err);
    });


  }
}


export function env(key): string {
  const myVal: string | undefined = process.env[key];
  if(myVal === undefined){
      throw new Error(`No ENV ${key} not found`);
  }
  return myVal;
}
