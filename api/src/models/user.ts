import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as bluebird from 'bluebird';
import {ROLE_USER, ROLE_PROFESSIONAL, ROLE_ADMIN, ROLE_SUPERADMIN} from '../constants/roles';
(<any>mongoose).Promise = bluebird;
const Schema = mongoose.Schema;


const UserSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profile: {
    firstName: { type: String },
    lastName: { type: String }
  },
  role: {
    type: String,
    enum: [ROLE_USER, ROLE_PROFESSIONAL, ROLE_ADMIN, ROLE_SUPERADMIN],
    default: ROLE_USER
  },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date }
},
  {
    timestamps: true
  });

UserSchema.pre('save',  function(this: any, next:Function){
  const user = this;
  const SALT_FACTOR:  number = 10;
  if (!this.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return cb(err); }

    cb(null, isMatch);
  });
};

export const User = mongoose.model('User', UserSchema);