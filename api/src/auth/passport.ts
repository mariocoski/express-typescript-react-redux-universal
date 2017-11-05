import * as passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { env, comparePassword, formatError, getErrors } from '../utils';
import { Strategy as LocalStrategy } from 'passport-local';
import { findUserByEmail, findUserById } from '../repositories/userRepo';
import { UNAUTHORIZED,INVALID_CREDENTIALS, USER_DOES_NOT_EXIST } from '../constants/errors';
import { Request, Response, NextFunction} from 'express';
import {BadRequestError,UnauthorizedError} from '../lib/errors';

const localOptions = {
  usernameField: 'email'
};

const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {
  const user = await findUserByEmail(email);  
  if(! user){
    return done(null, false);
  }
  const userModel = user.get({ plain: true });
  const isMatch: boolean =  await comparePassword(password,userModel.password);
  if(isMatch){
    return done(null, user);
  }
  return done(null, false);
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: env('JWT_SECRET'),
  session: false
};

const jwtLogin = new JWTStrategy(jwtOptions, async(payload, done) => {

  if(!payload._id){
    return done(new BadRequestError(), false);
  }
  const user = await findUserById(payload._id);  
  if (user) {
    return done(null, user);
  } else {
    return done(new UnauthorizedError(), false);
  }
});
passport.use(localLogin);
passport.use(jwtLogin);

const requireAuth = (req:Request , res: Response, next: NextFunction) => {
  passport.authenticate('jwt', function(err:any, user: any, info: any) {
    if (err) { return next(err); }
    if (!user) { 
      res.status(401);
      res.json(formatError(UNAUTHORIZED));
      return;
    }
    req.user = user;
    next();
  })(req, res, next);
 };

const requireLogin = (req:Request , res: Response, next: NextFunction) => {
 
  const errors = getErrors(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }

  passport.authenticate('local', function(err:any, user: any, info: any) {
    if (err) { return next(err); }
    if (!user) { 
        res.status(422);
        res.json(formatError(INVALID_CREDENTIALS));
        return;
    }
    req.user = user;
    next();
  })(req, res, next);
};

export {
  requireAuth,
  requireLogin
}
