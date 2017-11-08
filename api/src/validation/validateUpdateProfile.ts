import * as validator from 'express-validator/check';
import { EMAIL_IS_INVALID, EMAIL_ALREADY_IN_USE,
         PASSWORD_IS_REQUIRED, PASSWORD_IS_TOO_SHORT
         } from '../constants/errors';
import {findUserByEmail} from '../repositories/userRepo';

export default [
  validator.check('email',EMAIL_IS_INVALID).optional().isEmail().custom(async (value, data) => {
    const user = await findUserByEmail(value);
    if(user && data.req.user.email !== value){
      throw new Error(EMAIL_ALREADY_IN_USE);
    }
    return true;
  }).trim().normalizeEmail(),
  validator.check('password', PASSWORD_IS_TOO_SHORT).optional().isLength({ min: 6 }),
  validator.check('first_name').trim(),
  validator.check('last_name').trim(),
  validator.check('bio').trim()
];