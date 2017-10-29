import * as passport from 'passport';
// import {User} from '../models/user';
import {Strategy as JWTStrategy} from 'passport-jwt';
import {ExtractJwt} from 'passport-jwt';
import {env, comparePassword, formatError, getErrors} from '../utils';
import {Strategy as LocalStrategy} from 'passport-local';
import { findUserByEmail } from '../repositories/userRepo';
import { INVALID_CREDENTIALS } from '../constants/errors';
import { Request, Response, NextFunction} from 'express';

const localOptions = {
  usernameField: 'email'
};

const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {
    try{
      const user = await findUserByEmail(email);  
      if(! user){
        return done(null, false);
      }
      const userModel = user.get({ plain: true });
      const isMatch: boolean =  await comparePassword(password,userModel.password);
      if(! isMatch){
        return done(null, false);
      }
      return done(null, user);
    }catch(e){
      return done(e);
    }
});


// const jwtOptions = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: env('JWT_SECRET'),
//   session: false
// };

// const jwtLogin = new JWTStrategy(jwtOptions, (payload, done) => {
//     User.findById(payload._id, (err, user) => {
//     if (err) { return done(err, false); }

//     if (user) {
//         done(null, user);
//     } else {
//         done(null, false);
//     }
//     });
// });
passport.use(localLogin);

const requireLogin =  (req:Request , res: Response, next: NextFunction) => {
 
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
  // jwtLogin,
  requireLogin
}
