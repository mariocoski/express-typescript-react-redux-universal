import * as passport from 'passport';
import {User} from '../models/user';
import {Strategy as JWTStrategy} from 'passport-jwt';
import {ExtractJwt} from 'passport-jwt';
import {env} from '../utils';
import {Strategy as LocalStrategy} from 'passport-local';


const localOptions = {
    usernameField: 'email'
};

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
    User.findOne({ email }, (err, user:any) => {
    if (err) { return done(err); }
    if (!user) { return done(null, false, { message: 'Your login details could not be verified. Please try again.' }); }

    user.comparePassword(password, (err, isMatch) => {
        if (err) { return done(err); }
        if (!isMatch) { return done(null, false, { message: 'Your login details could not be verified. Please try again.' }); }

        return done(null, user);
    });
    });
});


const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: env('JWT_SECRET'),
  session: false
};

const jwtLogin = new JWTStrategy(jwtOptions, (payload, done) => {
    User.findById(payload._id, (err, user) => {
    if (err) { return done(err, false); }

    if (user) {
        done(null, user);
    } else {
        done(null, false);
    }
    });
});

export {
  jwtLogin, 
  localLogin
}
